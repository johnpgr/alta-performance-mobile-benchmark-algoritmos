import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import BarSortVisualizer from '@/components/BarSortVisualizer';
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import React, { useState } from 'react';
import {
    Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Peixe = { nome: string; preco: number };

// Pequeno conjunto de dados para visualização
const peixesVisualizacao: Peixe[] = [
  { nome: 'Tambaqui', preco: 25 },
  { nome: 'Pirarucu', preco: 40 },
  { nome: 'Filhote', preco: 35 },
  { nome: 'Dourada', preco: 28 },
  { nome: 'Pacu', preco: 22 },
  { nome: 'Mapará', preco: 18 },
  { nome: 'Jaraqui', preco: 15 },
  { nome: 'Tucunaré', preco: 30 },
];

// Dados numéricos para visualização com barras
const dadosNumericos = [64, 25, 12, 22, 11, 90, 5, 77, 30, 42];

export default function Visualizations() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'quicksort' | 'mergesort' | 'bubblesort' | null>(null);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [visualizerType, setVisualizerType] = useState<'fish' | 'bars'>('bars');

  const startVisualization = (algorithm: 'quicksort' | 'mergesort' | 'bubblesort', type: 'fish' | 'bars' = 'bars') => {
    setSelectedAlgorithm(algorithm);
    setVisualizerType(type);
    setShowVisualizer(true);
  };

  const goBack = () => {
    setShowVisualizer(false);
    setSelectedAlgorithm(null);
  };

  if (showVisualizer && selectedAlgorithm) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        {visualizerType === 'bars' ? (
          <BarSortVisualizer
            algorithm={selectedAlgorithm}
            data={dadosNumericos}
            onComplete={() => {
              // Optional: Handle completion
            }}
          />
        ) : (
          selectedAlgorithm !== 'bubblesort' && (
            <AlgorithmVisualizer
              algorithm={selectedAlgorithm}
              data={peixesVisualizacao}
              onComplete={() => {
                // Optional: Handle completion
              }}
            />
          )
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🎬 Visualização de Algoritmos</Text>
        <Text style={styles.subtitle}>
          Veja como os algoritmos de ordenação funcionam passo a passo
        </Text>

        <View style={styles.algorithmCard}>
          <Text style={styles.cardTitle}>Quick Sort</Text>
          <Text style={styles.cardDescription}>
            Algoritmo de ordenação que usa a estratégia "dividir para conquistar". 
            Seleciona um elemento como pivot e particiona o array em torno dele.
          </Text>
          <View style={styles.complexityInfo}>
            <Text style={styles.complexityTitle}>Complexidade:</Text>
            <Text style={styles.complexityText}>• Melhor caso: O(n log n)</Text>
            <Text style={styles.complexityText}>• Caso médio: O(n log n)</Text>
            <Text style={styles.complexityText}>• Pior caso: O(n²)</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.visualizeButton, styles.quickSortButton]} 
              onPress={() => startVisualization('quicksort', 'bars')}
            >
              <Text style={styles.visualizeButtonText}>📊 Barras</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.visualizeButton, styles.quickSortButton]} 
              onPress={() => startVisualization('quicksort', 'fish')}
            >
              <Text style={styles.visualizeButtonText}>🐟 Peixes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.algorithmCard}>
          <Text style={styles.cardTitle}>Merge Sort</Text>
          <Text style={styles.cardDescription}>
            Algoritmo de ordenação estável que divide recursivamente o array pela metade 
            e depois mescla as metades ordenadas.
          </Text>
          <View style={styles.complexityInfo}>
            <Text style={styles.complexityTitle}>Complexidade:</Text>
            <Text style={styles.complexityText}>• Melhor caso: O(n log n)</Text>
            <Text style={styles.complexityText}>• Caso médio: O(n log n)</Text>
            <Text style={styles.complexityText}>• Pior caso: O(n log n)</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.visualizeButton, styles.mergeSortButton]} 
              onPress={() => startVisualization('mergesort', 'bars')}
            >
              <Text style={styles.visualizeButtonText}>📊 Barras</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.visualizeButton, styles.mergeSortButton]} 
              onPress={() => startVisualization('mergesort', 'fish')}
            >
              <Text style={styles.visualizeButtonText}>🐟 Peixes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.algorithmCard}>
          <Text style={styles.cardTitle}>Bubble Sort</Text>
          <Text style={styles.cardDescription}>
            Algoritmo simples que compara elementos adjacentes e os troca se estiverem 
            na ordem errada. É fácil de entender, mas ineficiente para grandes conjuntos.
          </Text>
          <View style={styles.complexityInfo}>
            <Text style={styles.complexityTitle}>Complexidade:</Text>
            <Text style={styles.complexityText}>• Melhor caso: O(n)</Text>
            <Text style={styles.complexityText}>• Caso médio: O(n²)</Text>
            <Text style={styles.complexityText}>• Pior caso: O(n²)</Text>
          </View>
          <TouchableOpacity 
            style={[styles.visualizeButton, styles.bubbleSortButton]} 
            onPress={() => startVisualization('bubblesort', 'bars')}
          >
            <Text style={styles.visualizeButtonText}>▶ Visualizar Bubble Sort</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dataInfo}>
          <Text style={styles.dataTitle}>📊 Dados para visualização com barras:</Text>
          <Text style={styles.dataText}>[{dadosNumericos.join(', ')}]</Text>
        </View>

        <View style={styles.dataInfo}>
          <Text style={styles.dataTitle}>🐟 Dados dos peixes (Quick/Merge Sort):</Text>
          <View style={styles.dataList}>
            {peixesVisualizacao.map((peixe, index) => (
              <View key={index} style={styles.dataItem}>
                <Text style={styles.dataTextSmall}>{peixe.nome}</Text>
                <Text style={styles.dataPrice}>R${peixe.preco}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingBottom: Platform.OS === "ios" ? 32 : 0,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 24,
  },
  backButton: {
    backgroundColor: '#374151',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#e2e8f0',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#facc15',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  algorithmCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 16,
  },
  complexityInfo: {
    marginBottom: 16,
  },
  complexityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  complexityText: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 4,
  },
  visualizeButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickSortButton: {
    backgroundColor: '#dc2626',
  },
  mergeSortButton: {
    backgroundColor: '#2563eb',
  },
  bubbleSortButton: {
    backgroundColor: '#7c3aed',
  },
  visualizeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: '#064e3b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d1fae5',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#a7f3d0',
    marginBottom: 6,
  },
  dataInfo: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 12,
  },
  dataList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dataItem: {
    backgroundColor: '#374151',
    borderRadius: 6,
    padding: 8,
    margin: 4,
    alignItems: 'center',
  },
  dataText: {
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  dataTextSmall: {
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: 'bold',
  },
  dataPrice: {
    fontSize: 10,
    color: '#facc15',
  },
});
