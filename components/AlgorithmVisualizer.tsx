import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Peixe = { nome: string; preco: number };
type VisualizationStep = {
  array: Peixe[];
  comparing?: number[];
  pivot?: number;
  sorted?: number[];
  merging?: { left: number[]; right: number[]; merged: number[] };
  action: string;
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 60;
const ITEM_HEIGHT = 40;

interface AlgorithmVisualizerProps {
  algorithm: 'quicksort' | 'mergesort';
  data: Peixe[];
  onComplete?: () => void;
}

export default function AlgorithmVisualizer({ algorithm, data, onComplete }: AlgorithmVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedValues] = useState(() => 
    data.map(() => new Animated.Value(0))
  );

  useEffect(() => {
    generateSteps();
  }, [algorithm, data]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        animateStep();
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1 && isPlaying) {
      setIsPlaying(false);
      onComplete?.();
    }
  }, [currentStep, isPlaying, steps.length]);

  const animateStep = () => {
    const step = steps[currentStep];
    if (step?.comparing) {
      // Animate comparing elements
      step.comparing.forEach(index => {
        Animated.sequence([
          Animated.timing(animatedValues[index], {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValues[index], {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  };

  const generateSteps = () => {
    if (algorithm === 'quicksort') {
      setSteps(generateQuickSortSteps(data.slice()));
    } else {
      setSteps(generateMergeSortSteps(data.slice()));
    }
    setCurrentStep(0);
  };

  const generateQuickSortSteps = (arr: Peixe[]): VisualizationStep[] => {
    const steps: VisualizationStep[] = [];
    
    function quickSortWithSteps(array: Peixe[], start = 0, end = array.length - 1): void {
      if (start >= end) return;

      steps.push({
        array: [...array],
        action: `Selecionando pivot: ${array[end].nome} (${array[end].preco})`
      });

      const pivotIndex = partition(array, start, end);
      
      steps.push({
        array: [...array],
        pivot: pivotIndex,
        action: `Pivot ${array[pivotIndex].nome} está na posição correta`
      });

      quickSortWithSteps(array, start, pivotIndex - 1);
      quickSortWithSteps(array, pivotIndex + 1, end);
    }

    function partition(array: Peixe[], start: number, end: number): number {
      const pivot = array[end];
      let i = start;

      for (let j = start; j < end; j++) {
        steps.push({
          array: [...array],
          comparing: [j, end],
          action: `Comparando ${array[j].nome} (${array[j].preco}) com pivot ${pivot.nome} (${pivot.preco})`
        });

        if (array[j].preco < pivot.preco) {
          [array[i], array[j]] = [array[j], array[i]];
          
          steps.push({
            array: [...array],
            action: `Trocando ${array[j].nome} com ${array[i].nome}`
          });
          
          i++;
        }
      }

      [array[i], array[end]] = [array[end], array[i]];
      
      steps.push({
        array: [...array],
        action: `Colocando pivot na posição final`
      });

      return i;
    }

    steps.push({
      array: [...arr],
      action: 'Iniciando Quick Sort'
    });

    quickSortWithSteps(arr);
    
    steps.push({
      array: [...arr],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      action: 'Quick Sort completo!'
    });

    return steps;
  };

  const generateMergeSortSteps = (arr: Peixe[]): VisualizationStep[] => {
    const steps: VisualizationStep[] = [];

    function mergeSortWithSteps(array: Peixe[], start = 0, end = array.length - 1): void {
      if (start >= end) return;

      const mid = Math.floor((start + end) / 2);

      steps.push({
        array: [...array],
        action: `Dividindo array: posições ${start} a ${mid} e ${mid + 1} a ${end}`
      });

      mergeSortWithSteps(array, start, mid);
      mergeSortWithSteps(array, mid + 1, end);
      merge(array, start, mid, end);
    }

    function merge(array: Peixe[], start: number, mid: number, end: number): void {
      const left = array.slice(start, mid + 1);
      const right = array.slice(mid + 1, end + 1);

      steps.push({
        array: [...array],
        merging: {
          left: Array.from({ length: left.length }, (_, i) => start + i),
          right: Array.from({ length: right.length }, (_, i) => mid + 1 + i),
          merged: []
        },
        action: `Mesclando arrays: [${left.map(p => p.nome).join(', ')}] e [${right.map(p => p.nome).join(', ')}]`
      });

      let i = 0, j = 0, k = start;
      
      while (i < left.length && j < right.length) {
        steps.push({
          array: [...array],
          comparing: [start + i, mid + 1 + j],
          action: `Comparando ${left[i].nome} (${left[i].preco}) com ${right[j].nome} (${right[j].preco})`
        });

        if (left[i].preco <= right[j].preco) {
          array[k] = left[i];
          i++;
        } else {
          array[k] = right[j];
          j++;
        }
        k++;

        steps.push({
          array: [...array],
          action: `Elemento ${array[k-1].nome} colocado na posição ${k-1}`
        });
      }

      while (i < left.length) {
        array[k] = left[i];
        i++;
        k++;
        steps.push({
          array: [...array],
          action: `Copiando elemento restante: ${array[k-1].nome}`
        });
      }

      while (j < right.length) {
        array[k] = right[j];
        j++;
        k++;
        steps.push({
          array: [...array],
          action: `Copiando elemento restante: ${array[k-1].nome}`
        });
      }
    }

    steps.push({
      array: [...arr],
      action: 'Iniciando Merge Sort'
    });

    mergeSortWithSteps(arr);
    
    steps.push({
      array: [...arr],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      action: 'Merge Sort completo!'
    });

    return steps;
  };

  const getCurrentStep = () => steps[currentStep] || { array: data, action: 'Pronto para começar' };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    animatedValues.forEach(val => val.setValue(0));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      animateStep();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = getCurrentStep();

  const getElementStyle = (index: number) => {
    const isComparing = step.comparing?.includes(index);
    const isPivot = step.pivot === index;
    const isSorted = step.sorted?.includes(index);
    const isInLeftMerge = step.merging?.left.includes(index);
    const isInRightMerge = step.merging?.right.includes(index);

    let backgroundColor = '#374151';
    if (isSorted) backgroundColor = '#10b981';
    else if (isPivot) backgroundColor = '#f59e0b';
    else if (isComparing) backgroundColor = '#ef4444';
    else if (isInLeftMerge) backgroundColor = '#3b82f6';
    else if (isInRightMerge) backgroundColor = '#8b5cf6';

    return {
      backgroundColor,
      transform: [
        {
          scale: animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          }),
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {algorithm === 'quicksort' ? 'Quick Sort' : 'Merge Sort'} Visualization
      </Text>
      
      <Text style={styles.stepInfo}>
        Passo {currentStep + 1} de {steps.length}
      </Text>
      
      <Text style={styles.action}>{step.action}</Text>
      
      <View style={styles.arrayContainer}>
        {step.array.map((peixe, index) => (
          <Animated.View
            key={`${peixe.nome}-${index}`}
            style={[styles.arrayElement, getElementStyle(index)]}
          >
            <Text style={styles.elementText}>{peixe.nome}</Text>
            <Text style={styles.elementPrice}>R${peixe.preco}</Text>
          </Animated.View>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.legendText}>Comparando</Text>
        </View>
        {algorithm === 'quicksort' && (
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.legendText}>Pivot</Text>
          </View>
        )}
        {algorithm === 'mergesort' && (
          <>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.legendText}>Esquerda</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#8b5cf6' }]} />
              <Text style={styles.legendText}>Direita</Text>
            </View>
          </>
        )}
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#10b981' }]} />
          <Text style={styles.legendText}>Ordenado</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={reset}>
          <Text style={styles.controlButtonText}>⏮ Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={prevStep}>
          <Text style={styles.controlButtonText}>⏪ Anterior</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.playButton]} 
          onPress={isPlaying ? pause : play}
        >
          <Text style={styles.controlButtonText}>
            {isPlaying ? '⏸ Pausar' : '▶ Play'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={nextStep}>
          <Text style={styles.controlButtonText}>Próximo ⏩</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#facc15',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepInfo: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 8,
  },
  action: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 20,
    minHeight: 40,
    paddingHorizontal: 8,
  },
  arrayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  arrayElement: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  elementText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  elementPrice: {
    fontSize: 8,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  controlButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  playButton: {
    backgroundColor: '#22c55e',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
