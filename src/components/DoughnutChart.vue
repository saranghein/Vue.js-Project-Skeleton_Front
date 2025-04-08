<template>
  <div class="chart-wrapper">
    <h3>{{ type }} 카테고리 비율</h3>

    <div class="chart-area">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>

    <div v-if="selectedCategory" class="detail-list">
      <h4>📂 {{ selectedCategory }} 상세 내역</h4>
      <ul>
        <li v-for="item in filteredItems" :key="item.id">
          {{ item.date.slice(0, 10) }} - {{ item.memo }} -
          {{ item.amount.toLocaleString() }}원
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  defaults,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);
defaults.font.family = 'BMJUA_tff';

const props = defineProps({
  data: Array,
  type: String,
});

const selectedCategory = ref(null);

// 색상 고정 배열
const incomeColors = ['#FFB74D', '#FFD54F', '#81C784', '#4DB6AC', '#A1887F'];
const expenseColors = ['#4FC3F7', '#64B5F6', '#BA68C8', '#E57373', '#F06292'];

const categoryMap = computed(() => {
  const result = {};
  props.data
    .filter((item) => item.flow_type === props.type)
    .forEach((item) => {
      result[item.category] = (result[item.category] || 0) + item.amount;
    });
  return Object.entries(result).sort((a, b) => b[1] - a[1]);
});

const backgroundColors = computed(() => {
  const palette = props.type === '수입' ? incomeColors : expenseColors;
  return categoryMap.value.map((_, i) => palette[i % palette.length]);
});

const chartData = computed(() => {
  const labels = categoryMap.value.map(([cat]) => cat);
  const data = categoryMap.value.map(([, amt]) => amt);
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors.value,
        borderWidth: 1,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: false },
  },
  // ✅ 클릭 이벤트 Chart.js native로 등록
  onClick: (e, elements, chart) => {
    const index = chart.getElementsAtEventForMode(
      e,
      'nearest',
      { intersect: true },
      false
    )[0]?.index;

    if (index !== undefined) {
      const label = chart.data.labels[index];
      selectedCategory.value = selectedCategory.value === label ? null : label;
    }
  },
}));

const filteredItems = computed(() => {
  if (!selectedCategory.value) return [];
  return props.data.filter(
    (item) =>
      item.flow_type === props.type && item.category === selectedCategory.value
  );
});
</script>

<style scoped>
.chart-wrapper {
  margin: 24px 0;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 16px;
  background: #fdfdfd;
}
.chart-area {
  height: 300px;
  position: relative;
}
.detail-list {
  margin-top: 16px;
}
.detail-list ul {
  padding-left: 16px;
  line-height: 1.6;
}
h3,
h4 {
  font-family: 'BMJUA_tff', sans-serif;
}
</style>
