<template>
  <div class="container" @scroll.passive="handleScroll">
    <!-- 공통 헤더 -->
    <HomeHeader />

    <!-- 요약 + 그래프: 반응형 구성 -->
    <div class="responsive-summary-graph">
      <!-- 왼쪽 컬럼: balance-summary + summary(수입/지출 요약) -->
      <div>
        <div class="month-header">
          <i class="fa-solid fa-chevron-left" @click="goPrevMonth" />
          <span>{{ currentMonth.format('YYYY년 M월') }}</span>
          <i class="fa-solid fa-chevron-right" @click="goNextMonth" />
        </div>
        <!-- 수입 지출 비교 탭 -->
        <div class="balance-summary" @click="goToTransactionHistory">
          <div class="balance-text">
            <p>이번 달은...</p>
            <p v-if="totalIncome > totalExpense">
              💰 {{ (totalIncome - totalExpense).toLocaleString() }}원 벌었어요
            </p>
            <p v-else-if="totalExpense > totalIncome">
              😢 {{ (totalExpense - totalIncome).toLocaleString() }}원 더 썼어요
              ㅠㅠ
            </p>
            <p v-else>수입과 지출이 같아요</p>
            <span class="hint">클릭해서 자세히 보기</span>
          </div>
        </div>

        <section class="summary">
          <div class="box">
            <p>수입</p>
            <h3 class="blue">{{ totalIncome.toLocaleString() }}원</h3>
          </div>
          <div class="box">
            <p>지출</p>
            <h3 class="red">{{ totalExpense.toLocaleString() }}원</h3>
          </div>
          <div class="graph-spacing">
            <IncomeExpenseChart :data="filteredBudget" class="scroll-appear" />
          </div>
        </section>
      </div>

      <!-- 오른쪽 컬럼: 그래프들 -->
      <div class="graph-group">
        <div class="graph-spacing">
          <DoughnutChart
            :data="filteredBudget"
            type="수입"
            class="scroll-appear"
          />
        </div>
        <div class="graph-spacing">
          <DoughnutChart
            :data="filteredBudget"
            type="지출"
            class="scroll-appear"
          />
        </div>
      </div>
    </div>

    <!-- FAB 아이콘 버튼 -->
    <div class="fab-group">
      <div class="fab calendar" @click="toggleCalendar">
        <svg
          class="fab-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1
              0-2 .9-2 2v14c0 1.1.9 2 2
              2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0
              16H5V9h14v11zm0-13H5V6h14v1z"
          />
        </svg>
      </div>
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

    <!-- Calendar 모달 -->
    <Calendar v-if="showCalendar" :budget="budget" @close="toggleCalendar" />
    <RegistrationModal
      v-if="showRegistration"
      @close="showRegistration = false"
      @submitted="handleSubmitted"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// 공통 컴포넌트
import HomeHeader from '@/components/common/HomeHeader.vue';
import IncomeExpenseChart from '@/components/Chart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import Calendar from '@/components/Calendar.vue';
import RegistrationModal from '@/components/RegistrationModal.vue'; // ✅ 모달 import
import dayjs from 'dayjs';

const router = useRouter();

const budget = ref([]);
const totalIncome = computed(() =>
  filteredBudget.value
    .filter((item) => item.flow_type === '수입')
    .reduce((sum, item) => sum + item.amount, 0)
);

const totalExpense = computed(() =>
  filteredBudget.value
    .filter((item) => item.flow_type === '지출')
    .reduce((sum, item) => sum + item.amount, 0)
);
const showMoreHint = ref(true);
const showCalendar = ref(false);
const showRegistration = ref(false);
const currentMonth = ref(dayjs());

// ✅ 추가: 카테고리 / 결제수단 목록
const categories = ref([]);
const paymentMethods = ref([]);
const filteredBudget = computed(() =>
  budget.value.filter((item) =>
    dayjs(item.date).isSame(currentMonth.value, 'month')
  )
);

onMounted(async () => {
  const currentUserId = 'test_user'; // ✅ 로그인된 유저 ID

  // ✅ 3개 데이터 병렬 fetch
  const [moneyRes, categoryRes, paymentMethodRes] = await Promise.all([
    axios.get('http://localhost:3000/money'),
    axios.get('http://localhost:3000/categories'),
    axios.get('http://localhost:3000/paymentMethods'),
  ]);

  categories.value = categoryRes.data;
  paymentMethods.value = paymentMethodRes.data;

  const userData = moneyRes.data.filter(
    (item) => item.user_id === currentUserId
  );

  // ✅ categoryName, paymentMethodName 매핑 추가
  budget.value = userData.map((item) => ({
    ...item,
    categoryName:
      categories.value.find((c) => c.name === item.category)?.name ||
      item.category,
    paymentMethodName:
      paymentMethods.value.find((p) => p.name === item.payment_method)?.name ||
      item.payment_method,
  }));

  totalIncome.value = budget.value
    .filter((item) => item.flow_type === '수입')
    .reduce((sum, item) => sum + item.amount, 0);

  totalExpense.value = budget.value
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

function goToTransactionHistory() {
  router.push('/transaction-history');
}

function goToAdd() {
  showRegistration.value = true;
}

function toggleCalendar() {
  showCalendar.value = !showCalendar.value;
}

function goPrevMonth() {
  currentMonth.value = currentMonth.value.subtract(1, 'month');
}
function goNextMonth() {
  currentMonth.value = currentMonth.value.add(1, 'month');
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 16px;
  position: relative;
}

.month-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
  font-size: 30px;
  font-weight: bold;
}
.month-header i {
  cursor: pointer;
  font-size: 32px;
  color: rgb(52, 191, 156);
}

/* 수입 지출 비교 탭 */
.balance-summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 왼쪽 정렬 */

  text-align: left;
  background: #cef9ed;
  border-radius: 12px;
  height: 150px;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 25px;
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
.balance-text {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 가운데 정렬 */
  text-align: center; /* 텍스트도 가운데 정렬 */
}

.balance-text p {
  margin: 4px 0;
}
/* 반응형으로 요약 + 그래프 배치 */
.responsive-summary-graph {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media screen and (min-width: 768px) {
  .responsive-summary-graph {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 왼쪽 1, 오른쪽 2 배 */
    align-items: start;
    gap: 32px;
  }
}

/* 수입/지출 요약 영역 */
.summary {
  display: flex;
  justify-content: space-around;
  gap: 12px;

  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.box {
  text-align: center;
  background: #f4fdfb;
  border-radius: 12px;
  padding: 12px;
  flex: 1 1 45%;
  transition: transform 0.2s ease;
  cursor: default;
}
.box:hover {
  transform: scale(1.03);
}

/* 그래프들 */
.graph-group {
}
.graph-spacing {
  margin-top: 24px;
  margin-bottom: 24px;
}

/* 애니메이션 */
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

/* 수입, 지출 색상 */
.blue {
  color: #007aff;
}
.red {
  color: #ff3b30;
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

.fab-group {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  z-index: 20;
}

.fab {
  width: 56px;
  height: 56px;
  background-color: #55efc4;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.fab:hover {
  background-color: rgb(52, 191, 156);
}
.fab.calendar {
  background-color: #81ecec;
}
.fab.calendar:hover {
  background-color: #00cec9;
}
.fab-icon {
  width: 28px;
  height: 28px;
  fill: white;
}
</style>
