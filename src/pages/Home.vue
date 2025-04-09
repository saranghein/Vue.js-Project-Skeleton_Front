<template>
  <div class="container" @scroll.passive="handleScroll">
    <!-- 공통 헤더 -->
    <HomeHeader />

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

    <!-- FAB 아이콘 버튼 -->
    <div class="fab" @click="goToAdd">
      <svg
        class="fab-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 5.52
             4.48 10 10 10s10-4.48 10-10C22
             6.48 17.52 2 12 2zm5 11h-4v4h-2
             v-4H7v-2h4V7h2v4h4v2z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// 공통 컴포넌트
import HomeHeader from '@/components/common/HomeHeader.vue';
import IncomeExpenseChart from '@/components/Chart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';

const budget = ref([]);
const totalIncome = ref(0);
const totalExpense = ref(0);
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

function handleScroll() {
  const bottomThreshold = 100;
  const scrollBottom =
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - bottomThreshold;
  showMoreHint.value = !scrollBottom;
}

function goToDetails() {
  router.push('/details');
}

function goToAdd() {
  router.push('/add');
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 16px;
  position: relative;
}

/* 불필요한 .header, .menu-btn 스타일 제거 */

.balance-summary {
  text-align: center;
  background: #cef9ed;
  border-radius: 12px;
  padding: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}
.balance-summary:hover {
  background: rgb(105, 195, 173);
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
  margin-top: 75px;
  margin-bottom: 75px;
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

/* FAB: 파란 원형 + 아이콘 */
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: #55efc4;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: background-color 0.2s ease;
}
.fab:hover {
  background-color: rgb(52, 191, 156);
}
.fab-icon {
  width: 28px;
  height: 28px;
  fill: white;
}
</style>
