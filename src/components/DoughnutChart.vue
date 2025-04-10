<template>
  <div
    ref="observerTarget"
    class="chart-wrapper scroll-hidden"
    :class="{ 'scroll-visible': isVisible }"
  >
    <h3>{{ type }} 카테고리 비율</h3>

    <div class="chart-area">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>

    <transition name="fade-slide" mode="out-in">
      <div v-if="selectedCategory" class="detail-list" :key="selectedCategory">
        <h4>📂 {{ selectedCategory }} 상세 내역</h4>
        <ul class="detail-list-ul">
          <li v-for="item in filteredItems" :key="item.id" class="detail-item">
            <div class="detail-left">
              <p class="detail-date">{{ item.date.slice(0, 10) }}</p>
              <p class="detail-memo">{{ item.source }}</p>
            </div>
            <div
              class="detail-amount"
              :class="item.flow_type === '수입' ? 'blue' : 'red'"
            >
              {{ item.amount.toLocaleString() }}원
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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

const observerTarget = ref(null);
const isVisible = ref(false);
const selectedCategory = ref(null);

// CategoryIcon.vue의 아이콘/색상 매핑 그대로 복붙
const incomeIcons = {
  월급: ['briefcase', '#4CAF50'],
  용돈: ['sack-dollar', '#FFC107'],
  기타: ['folder-plus', '#03A9F4'],
};

const expenseIcons = {
  식비: ['utensils', '#FF5722'],
  쇼핑: ['basket-shopping', '#9C27B0'],
  커피: ['mug-hot', '#795548'],
  문화생활: ['masks-theater', '#673AB7'],
  교통: ['car-side', '#2196F3'],
  기타: ['folder-minus', '#607D8B'],
};

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
  return categoryMap.value.map(([cat]) => {
    const color =
      props.type === '수입' ? incomeIcons[cat]?.[1] : expenseIcons[cat]?.[1];
    return color || '#BDBDBD'; // 기본 색
  });
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

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
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

.scroll-hidden {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}
.scroll-visible {
  opacity: 1;
  transform: translateY(0);
}

.detail-list {
  margin-top: 16px;
}
.detail-list-ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.detail-left {
  display: flex;
  flex-direction: column;
}
.detail-date {
  font-size: 13px;
  color: #999;
  margin: 0;
}
.detail-memo {
  font-size: 14px;
  margin: 2px 0 0 0;
  font-weight: 500;
}
.detail-amount {
  font-weight: bold;
  font-size: 15px;
}
.blue {
  color: #007aff;
}
.red {
  color: #ff3b30;
}

/* 전환 애니메이션 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.15s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
