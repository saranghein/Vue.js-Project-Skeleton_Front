<template>
  <div class="chart-wrapper">
    <h3>{{ type }} 카테고리 비율</h3>

    <!-- 고정 높이로 감싸서 렌더 보장 -->
    <div class="chart-area">
      <Doughnut
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
        @click="handleClick"
      />
    </div>

    <div v-if="selectedCategory" class="detail-list">
      <h4>{{ selectedCategory }} 상세 내역</h4>
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
import { ref, computed, onMounted, watch } from 'vue';
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

// 전역 폰트 적용
defaults.font.family = 'BMJUA_tff';

const props = defineProps({
  data: Array,
  type: String, // '수입' 또는 '지출'
});

const selectedCategory = ref(null);
const backgroundColors = ref([]);

// 카테고리별 합계 계산
const categoryMap = computed(() => {
  const result = {};
  props.data
    .filter((item) => item.flow_type === props.type)
    .forEach((item) => {
      if (!result[item.category]) {
        result[item.category] = 0;
      }
      result[item.category] += item.amount;
    });

  // 정렬: 높은 금액부터
  return Object.entries(result).sort((a, b) => b[1] - a[1]);
});

// 색상은 categoryMap이 바뀔 때만 한 번 생성
watch(
  categoryMap,
  (newVal) => {
    backgroundColors.value = newVal.map(
      () => `hsl(${Math.random() * 360}, 70%, 70%)`
    );
  },
  { immediate: true }
);

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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
    },
  },
};

const handleClick = (event, elements) => {
  const chart = event.chart;
  const index = chart.getElementsAtEventForMode(
    event.native,
    'nearest',
    { intersect: true },
    true
  )[0]?.index;

  if (index !== undefined) {
    selectedCategory.value = chart.data.labels[index];
  }
};

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
