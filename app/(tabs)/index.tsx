import { SafeAreaView } from "@/components/ui/SafeAreaView";
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Peixe = { nome: string; preco: number };

// ---------------------- Lista base de peixes ----------------------
// ---------------------- Lista completa de 100 peixes ----------------------
const peixesBase: Peixe[] = [
  { nome: 'Tambaqui', preco: 25 },
  { nome: 'Pirarucu', preco: 40 },
  { nome: 'Filhote', preco: 35 },
  { nome: 'Dourada', preco: 28 },
  { nome: 'Pacu', preco: 22 },
  { nome: 'Mapará', preco: 18 },
  { nome: 'Jaraqui', preco: 15 },
  { nome: 'Curimatã', preco: 20 },
  { nome: 'Aracu', preco: 16 },
  { nome: 'Tucunaré', preco: 30 },
  { nome: 'Surubim', preco: 38 },
  { nome: 'Traíra', preco: 24 },
  { nome: 'Piau', preco: 19 },
  { nome: 'Cará', preco: 14 },
  { nome: 'Mandii', preco: 21 },
  { nome: 'Acari', preco: 17 },
  { nome: 'Arraia', preco: 45 },
  { nome: 'Bagre', preco: 23 },
  { nome: 'Jacundá', preco: 27 },
  { nome: 'Bicuda', preco: 32 },
  { nome: 'Tilápia', preco: 26 },
  { nome: 'Robalo', preco: 42 },
  { nome: 'Sardinha', preco: 12 },
  { nome: 'Atum', preco: 50 },
  { nome: 'Cavala', preco: 33 },
  { nome: 'Corvina', preco: 29 },
  { nome: 'Anchova', preco: 27 },
  { nome: 'Linguado', preco: 34 },
  { nome: 'Enguia', preco: 39 },
  { nome: 'Garoupa', preco: 48 },
  { nome: 'Merluza', preco: 26 },
  { nome: 'Polvo', preco: 55 },
  { nome: 'Cação', preco: 31 },
  { nome: 'Pintado', preco: 37 },
  { nome: 'Moreia', preco: 41 },
  { nome: 'Xaréu', preco: 36 },
  { nome: 'Tainha', preco: 28 },
  { nome: 'Paru', preco: 30 },
  { nome: 'Peixe-Boi', preco: 60 },
  { nome: 'Peixe-Espada', preco: 44 },
  { nome: 'Olhete', preco: 34 },
  { nome: 'Cavalo-Marinho', preco: 70 },
  { nome: 'Bonito', preco: 32 },
  { nome: 'Albacora', preco: 47 },
  { nome: 'Serra', preco: 29 },
  { nome: 'Badejo', preco: 43 },
  { nome: 'Pargo', preco: 38 },
  { nome: 'Peixe-Lua', preco: 65 },
  { nome: 'Carapicu', preco: 19 },
  { nome: 'Guarijuba', preco: 35 },
  { nome: 'Moréia-Verde', preco: 46 },
  { nome: 'Peixe-Galo', preco: 40 },
  { nome: 'Agulha', preco: 21 },
  { nome: 'Cangulo', preco: 28 },
  { nome: 'Beijupirá', preco: 52 },
  { nome: 'Peixe-Rei', preco: 31 },
  { nome: 'Baiacu', preco: 33 },
  { nome: 'Arraia-Jamanta', preco: 75 },
  { nome: 'Tamboril', preco: 42 },
  { nome: 'Caranha', preco: 49 },
  { nome: 'Mero', preco: 60 },
  { nome: 'Peixe-Palhaço', preco: 22 },
  { nome: 'Peixe-Anjo', preco: 28 },
  { nome: 'Peixe-Borboleta', preco: 26 },
  { nome: 'Peixe-Cachorro', preco: 30 },
  { nome: 'Peixe-Flauta', preco: 36 },
  { nome: 'Peixe-Cirurgião', preco: 38 },
  { nome: 'Peixe-Sapo', preco: 29 },
  { nome: 'Peixe-Leão', preco: 41 },
  { nome: 'Peixe-Mandarim', preco: 37 },
  { nome: 'Peixe-Arco-Íris', preco: 45 },
  { nome: 'Peixe-Tigre', preco: 50 },
  { nome: 'Peixe-Cobra', preco: 48 },
  { nome: 'Peixe-Gato', preco: 39 },
  { nome: 'Peixe-Dourado', preco: 27 },
  { nome: 'Peixe-Zebra', preco: 25 },
  { nome: 'Peixe-Porco', preco: 33 },
  { nome: 'Peixe-Pedra', preco: 46 },
  { nome: 'Peixe-Vela', preco: 55 },
  { nome: 'Peixe-Lixa', preco: 43 },
  { nome: 'Peixe-Cachimbo', preco: 31 },
  { nome: 'Peixe-Vermelho', preco: 29 },
  { nome: 'Peixe-Castanha', preco: 35 },
  { nome: 'Peixe-Capim', preco: 20 },
  { nome: 'Peixe-Piranha', preco: 24 },
  { nome: 'Peixe-Curupeté', preco: 18 },
  { nome: 'Peixe-Corró', preco: 22 },
  { nome: 'Peixe-Bagre-Elétrico', preco: 55 },
  { nome: 'Peixe-Trairão', preco: 40 },
  { nome: 'Peixe-Jundiá', preco: 27 },
  { nome: 'Peixe-Papagaio', preco: 44 },
  { nome: 'Peixe-Mojarra', preco: 32 },
  { nome: 'Peixe-Canjica', preco: 30 },
  { nome: 'Peixe-Camurim', preco: 36 },
  { nome: 'Peixe-Curvina', preco: 28 },
  { nome: 'Peixe-Ruivo', preco: 42 },
  { nome: 'Peixe-Coró', preco: 19 },
  { nome: 'Peixe-Jacu', preco: 21 },
  { nome: 'Peixe-Curuatá', preco: 23 },
  { nome: 'Peixe-Aruana', preco: 49 },
];

// ---------------------- Função para gerar muitos dados ----------------------
function gerarMuitosPeixes(qtd: number): Peixe[] {
    const resultado: Peixe[] = [];
    for (let i = 0; i < qtd; i++) {
        resultado.push(peixesBase[i % peixesBase.length]);
    }
    return resultado;
}

// ---------------------- Quick Sort ----------------------
function quickSort(arr: Peixe[]): Peixe[] {
  if (arr.length <= 1) return arr.slice();

  const pivot = arr[arr.length - 1];
  const left: Peixe[] = [], right: Peixe[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].preco < pivot.preco) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// ---------------------- Merge Sort ----------------------
function mergeSort(arr: Peixe[]): Peixe[] {
  if (arr.length <= 1) return arr.slice();

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merged: Peixe[] = [];

  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i].preco <= right[j].preco) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);

  return merged;
}

// ---------------------- Benchmark ----------------------
function timeIt(fn: (input: Peixe[]) => Peixe[], input: Peixe[], runs = 3) {
  const times: number[] = [];

  for (let i = 0; i < runs; i++) {
    const arrCopy = input.slice();
    const t0 = performance.now();
    fn(arrCopy);
    const t1 = performance.now();
    times.push(t1 - t0);
  }

  if (runs >= 3) times.shift(); // descarta a primeira execução

  const avg = times.reduce((s, v) => s + v, 0) / times.length;

  return {
    avg: avg.toFixed(4),
    min: Math.min(...times).toFixed(4),
    max: Math.max(...times).toFixed(4),
  };
}

type ResultadoBenchmark = {
    nome: string;
    complexidade: string;
    avg: string;
    min: string;
    max: string;
    n: number; // tamanho do array
};

export default function Algoritmos() {
  const [resultados, setResultados] = useState<ResultadoBenchmark[]>([]);
  const [tamanho, setTamanho] = useState(100); // número grande de dados

  function rodarBenchmark() {
    const lista = gerarMuitosPeixes(tamanho);

    const algoritmos = [
      {
        nome: 'Quick Sort',
        complexidade: 'Melhor: O(n log n) | Médio: O(n log n) | Pior: O(n²)',
        func: quickSort,
      },
      {
        nome: 'Merge Sort',
        complexidade: 'Melhor/Médio/Pior: O(n log n)',
        func: mergeSort,
      },
    ];

    const res = algoritmos.map(alg => {
      const { avg, min, max } = timeIt(alg.func, lista, 5);
      return { ...alg, avg, min, max, n: tamanho };
    }).sort((a, b) => parseFloat(a.avg) - parseFloat(b.avg));

    setResultados(res);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>⚡ Benchmark — Quick Sort x Merge Sort ⚡</Text>
        <Text style={styles.subtitle}>
          Comparando desempenho com {tamanho} registros de peixes 🐟
        </Text>

        <TouchableOpacity style={styles.button} onPress={rodarBenchmark}>
          <Text style={styles.buttonText}>▶ Rodar Benchmark</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {resultados.map((item, index) => (
            <View key={index} style={[styles.card, index === 0 && styles.winner]}>
              <Text style={styles.cardTitle}>
                {index === 0 ? '🏆 ' : ''}{item.nome}
              </Text>
              <Text style={styles.textSmall}>{item.complexidade}</Text>
              <View style={styles.metrics}>
                <Text style={styles.metric}>Média: <Text style={styles.value}>{item.avg} ms</Text></Text>
                <Text style={styles.metric}>Mín: <Text style={styles.value}>{item.min} ms</Text></Text>
                <Text style={styles.metric}>Máx: <Text style={styles.value}>{item.max} ms</Text></Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ---------------------- Estilos ----------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 16, paddingBottom: 32, gap: 24 },
  title: { 
    fontSize: 24,
    fontWeight: 'bold',
    color: '#facc15',
    textAlign: 'center',
  },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center' },
  button: { backgroundColor: '#22c55e', padding: 14, borderRadius: 8, },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', padding: 14, borderRadius: 10, marginBottom: 12 },
  winner: { borderColor: '#22c55e', borderWidth: 2, backgroundColor: '#064e3b' },
  cardTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 6, color: '#e2e8f0' },
  textSmall: { fontSize: 13, color: '#cbd5e1', marginBottom: 8 },
  metrics: { flexDirection: 'column', gap: 4 },
  metric: { fontSize: 14, color: '#f1f5f9' },
  value: { fontWeight: 'bold', color: '#facc15' },
});