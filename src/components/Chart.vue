<template>
  <div style="height: 300px">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  defaults,
} from 'chart.js';

defaults.font.family = 'BMJUA_tff';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  data: Array,
});

const groupedByDate = computed(() => {
  const dateMap = {};

  props.data.forEach((item) => {
    const date = item.date.slice(0, 10);
    if (!dateMap[date]) {
      dateMap[date] = { 수입: 0, 지출: 0 };
    }
    dateMap[date][item.flow_type] += item.amount;
  });

  const sortedDates = Object.keys(dateMap).sort();
  return {
    labels: sortedDates,
    incomeData: sortedDates.map((d) => dateMap[d]['수입'] || 0),
    expenseData: sortedDates.map((d) => dateMap[d]['지출'] || 0),
  };
});

const chartData = computed(() => ({
  labels: groupedByDate.value.labels,
  datasets: [
    {
      label: '수입',
      borderColor: '#007aff',
      data: groupedByDate.value.incomeData,
      fill: false,
    },
    {
      label: '지출',
      borderColor: '#ff3b30',
      data: groupedByDate.value.expenseData,
      fill: false,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '날짜별 수입/지출 추이',
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: (tooltipItems) => `날짜: ${tooltipItems[0].label}`,
        label: (tooltipItem) => {
          const date = tooltipItem.label;
          const flowType = tooltipItem.dataset.label; // '수입' or '지출'

          const matchedItems = props.data.filter(
            (item) =>
              item.date.slice(0, 10) === date && item.flow_type === flowType
          );

          if (matchedItems.length === 0) return '거래 없음';

          return matchedItems.map((item) => {
            const label = item.source || item.memo || '거래';
            const value = item.amount.toLocaleString();
            return `${label}: ${value}원`;
          });
        },
      },
    },
  },
};
</script>
