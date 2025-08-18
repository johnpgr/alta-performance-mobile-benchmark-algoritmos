import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type SortingStep = {
  array: number[];
  comparing?: number[];
  pivot?: number;
  sorted?: number[];
  action: string;
};

const { width } = Dimensions.get('window');
const MAX_HEIGHT = 150;

interface BarSortVisualizerProps {
  algorithm: 'quicksort' | 'mergesort' | 'bubblesort';
  data: number[];
  onComplete?: () => void;
}

export default function BarSortVisualizer({ algorithm, data, onComplete }: BarSortVisualizerProps) {
  const [steps, setSteps] = useState<SortingStep[]>([]);
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
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1 && isPlaying) {
      setIsPlaying(false);
      onComplete?.();
    }
  }, [currentStep, isPlaying, steps.length]);

  const animateStep = () => {
    const step = steps[currentStep];
    if (step?.comparing) {
      step.comparing.forEach(index => {
        Animated.sequence([
          Animated.timing(animatedValues[index], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValues[index], {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  };

  const generateSteps = () => {
    switch (algorithm) {
      case 'quicksort':
        setSteps(generateQuickSortSteps(data.slice()));
        break;
      case 'mergesort':
        setSteps(generateMergeSortSteps(data.slice()));
        break;
      case 'bubblesort':
        setSteps(generateBubbleSortSteps(data.slice()));
        break;
    }
    setCurrentStep(0);
  };

  const generateBubbleSortSteps = (arr: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const n = arr.length;

    steps.push({
      array: [...arr],
      action: 'Iniciando Bubble Sort - compara elementos adjacentes'
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          action: `Comparando ${arr[j]} com ${arr[j + 1]}`
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: [...arr],
            action: `Trocando ${arr[j + 1]} com ${arr[j]} - ${arr[j + 1]} > ${arr[j]}`
          });
        }
      }
      
      steps.push({
        array: [...arr],
        sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
        action: `Elemento ${arr[n - 1 - i]} está na posição final`
      });
    }

    steps.push({
      array: [...arr],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      action: 'Bubble Sort completo!'
    });

    return steps;
  };

  const generateQuickSortSteps = (arr: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    
    function quickSortWithSteps(array: number[], start = 0, end = array.length - 1): void {
      if (start >= end) return;

      steps.push({
        array: [...array],
        pivot: end,
        action: `Selecionando pivot: ${array[end]}`
      });

      const pivotIndex = partition(array, start, end);
      
      steps.push({
        array: [...array],
        pivot: pivotIndex,
        action: `Pivot ${array[pivotIndex]} está na posição correta`
      });

      quickSortWithSteps(array, start, pivotIndex - 1);
      quickSortWithSteps(array, pivotIndex + 1, end);
    }

    function partition(array: number[], start: number, end: number): number {
      const pivot = array[end];
      let i = start;

      for (let j = start; j < end; j++) {
        steps.push({
          array: [...array],
          comparing: [j, end],
          action: `Comparando ${array[j]} com pivot ${pivot}`
        });

        if (array[j] < pivot) {
          [array[i], array[j]] = [array[j], array[i]];
          
          if (i !== j) {
            steps.push({
              array: [...array],
              action: `Trocando ${array[j]} com ${array[i]}`
            });
          }
          
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

  const generateMergeSortSteps = (arr: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];

    function mergeSortWithSteps(array: number[], start = 0, end = array.length - 1): void {
      if (start >= end) return;

      const mid = Math.floor((start + end) / 2);

      steps.push({
        array: [...array],
        action: `Dividindo: [${array.slice(start, mid + 1).join(', ')}] | [${array.slice(mid + 1, end + 1).join(', ')}]`
      });

      mergeSortWithSteps(array, start, mid);
      mergeSortWithSteps(array, mid + 1, end);
      merge(array, start, mid, end);
    }

    function merge(array: number[], start: number, mid: number, end: number): void {
      const left = array.slice(start, mid + 1);
      const right = array.slice(mid + 1, end + 1);

      steps.push({
        array: [...array],
        action: `Mesclando: [${left.join(', ')}] com [${right.join(', ')}]`
      });

      let i = 0, j = 0, k = start;
      
      while (i < left.length && j < right.length) {
        steps.push({
          array: [...array],
          comparing: [start + i, mid + 1 + j],
          action: `Comparando ${left[i]} com ${right[j]}`
        });

        if (left[i] <= right[j]) {
          array[k] = left[i];
          i++;
        } else {
          array[k] = right[j];
          j++;
        }
        k++;

        steps.push({
          array: [...array],
          action: `Colocando ${array[k-1]} na posição ${k-1}`
        });
      }

      while (i < left.length) {
        array[k] = left[i];
        i++;
        k++;
        steps.push({
          array: [...array],
          action: `Copiando elemento restante: ${array[k-1]}`
        });
      }

      while (j < right.length) {
        array[k] = right[j];
        j++;
        k++;
        steps.push({
          array: [...array],
          action: `Copiando elemento restante: ${array[k-1]}`
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
  const maxValue = Math.max(...data);
  const barWidth = Math.max(20, (width - 40) / data.length - 4);

  const getBarStyle = (index: number, value: number) => {
    const isComparing = step.comparing?.includes(index);
    const isPivot = step.pivot === index;
    const isSorted = step.sorted?.includes(index);

    let backgroundColor = '#374151';
    if (isSorted) backgroundColor = '#10b981';
    else if (isPivot) backgroundColor = '#f59e0b';
    else if (isComparing) backgroundColor = '#ef4444';

    const height = (value / maxValue) * MAX_HEIGHT;

    return {
      backgroundColor,
      height,
      width: barWidth,
      transform: [
        {
          scale: animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
          }),
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {algorithm === 'quicksort' ? 'Quick Sort' : 
         algorithm === 'mergesort' ? 'Merge Sort' : 'Bubble Sort'} 
        - Visualização com Barras
      </Text>
      
      <Text style={styles.stepInfo}>
        Passo {currentStep + 1} de {steps.length}
      </Text>
      
      <Text style={styles.action}>{step.action}</Text>
      
      <View style={styles.barsContainer}>
        {step.array.map((value, index) => (
          <View key={index} style={styles.barWrapper}>
            <Animated.View
              style={[styles.bar, getBarStyle(index, value)]}
            />
            <Text style={styles.barValue}>{value}</Text>
          </View>
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
          <Text style={styles.controlButtonText}>⏪</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.playButton]} 
          onPress={isPlaying ? pause : play}
        >
          <Text style={styles.controlButtonText}>
            {isPlaying ? '⏸' : '▶'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={nextStep}>
          <Text style={styles.controlButtonText}>⏩</Text>
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
    fontSize: 18,
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
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 20,
    minHeight: 36,
    paddingHorizontal: 8,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: MAX_HEIGHT + 40,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  barWrapper: {
    alignItems: 'center',
    marginHorizontal: 2,
  },
  bar: {
    borderRadius: 4,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#cbd5e1',
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  playButton: {
    backgroundColor: '#22c55e',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
