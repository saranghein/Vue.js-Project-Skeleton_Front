<template>
  <div class="container" @scroll.passive="handleScroll">
    <header class="header">
      <button class="menu-btn">☰</button>
      <h2>Payday? Mayday!</h2>
    </header>

    <!-- 수입 지출 비교 탭 -->
    <div class="balance-summary" @click="goToDetails">
      <div class="balance-text">
        <p v-if="totalIncome > totalExpense">
          💰 {{ (totalIncome - totalExpense).toLocaleString() }}원 벌었어요
        </p>
        <p v-else-if="totalExpense > totalIncome">
          😢 {{ (totalExpense - totalIncome).toLocaleString() }}원 적자입니다
        </p>
        <p v-else>수입과 지출이 같아요</p>
        <span class="hint">클릭해서 자세히 보기</span>
      </div>
    </div>

    <!-- 요약 영역 -->
    <section class="summary">
      <div class="box">
        <p>수입</p>
        <h3 class="blue">{{ totalIncome.toLocaleString() }}원</h3>
      </div>
      <div class="box">
        <p>지출</p>
        <h3 class="red">{{ totalExpense.toLocaleString() }}원</h3>
      </div>
    </section>

    <!-- 그래프 간 간격 추가 -->
    <div class="graph-spacing">
      <IncomeExpenseChart :data="budget" class="scroll-appear" />
    </div>
    <div class="graph-spacing">
      <DoughnutChart :data="budget" type="수입" class="scroll-appear" />
    </div>
    <div class="graph-spacing">
      <DoughnutChart :data="budget" type="지출" class="scroll-appear" />
    </div>

    <!-- 더보기 텍스트 + 아이콘 -->
    <div v-show="showMoreHint" class="more-hint">
      <div class="more-text">더보기</div>
      <svg
        class="more-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 96 960 960"
        width="24"
      >
        <path
          d="M480 774 285 579l42-42 153 153 153-153 42 42-195 195Zm0-192L285 387l42-42 153 153 153-153 42 42-195 195Z"
        />
      </svg>
    </div>

    <button class="fab" @click="goToAdd">＋</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import IncomeExpenseChart from '@/components/Chart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';

const budget = ref([]);
const totalIncome = ref(0);
const totalExpense = ref(0);
const sortBy = ref('date');
const showMoreHint = ref(true);

const router = useRouter();

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/money');
  budget.value = res.data;

  totalIncome.value = res.data
    .filter((item) => item.flow_type === '수입')
    .reduce((sum, item) => sum + item.amount, 0);

  totalExpense.value = res.data
    .filter((item) => item.flow_type === '지출')
    .reduce((sum, item) => sum + item.amount, 0);

  window.addEventListener('scroll', handleScroll);
});

const topSortedBudget = computed(() => {
  const sorted = [...budget.value];

  if (sortBy.value === 'amount') {
    sorted.sort((a, b) => b.amount - a.amount);
  } else {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return sorted.slice(0, 5);
});

const goToDetails = () => {
  router.push('/details');
};

const goToAdd = () => {
  router.push('/add');
};

function handleScroll() {
  const bottomThreshold = 100;
  const scrollBottom =
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - bottomThreshold;
  showMoreHint.value = !scrollBottom;
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 16px;
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}
.menu-btn {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.balance-summary {
  text-align: center;
  background: #f1f4f8;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}
.balance-summary:hover {
  background: #e1e8f0;
}
.balance-summary .hint {
  font-size: 12px;
  font-weight: normal;
  color: #888;
  position: absolute;
  right: 12px;
  bottom: 8px;
}

.summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
}
.box {
  text-align: center;
}
.blue {
  color: #007aff;
}
.red {
  color: #ff3b30;
}

.graph-spacing {
  margin-bottom: 48px;
}

.scroll-appear {
  opacity: 0;
  transform: translateY(30px);
  animation: slide-up-fade 0.6s ease forwards;
}
@keyframes slide-up-fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 더보기 아이콘 + 텍스트 */
.more-hint {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 1.5s infinite ease-in-out;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.more-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.35);
  margin-bottom: -7px;
}
.more-icon {
  width: 32px;
  height: 32px;
  fill: rgba(0, 0, 0, 0.35);
  transform: scaleX(1.5);
}
@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 8px);
  }
}

.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 28px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 20;
}
</style>
