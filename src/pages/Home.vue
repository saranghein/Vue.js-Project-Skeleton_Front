<template>
  <div class="container">
    <header class="header">
      <button class="menu-btn">☰</button>
      <h2>Payday? Mayday!</h2>
    </header>

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

    <section class="list">
      <div class="select-wrap">
        <select v-model="sortBy" class="custom-select">
          <option value="date">📅 최신순</option>
          <option value="amount">💰 금액순</option>
        </select>
      </div>

      <div v-for="item in topSortedBudget" :key="item.id" class="item">
        <div class="left">
          <strong>{{ item.category }}</strong>
          <p class="memo">{{ item.memo }}</p>
        </div>
        <div :class="['right', item.flow_type === '수입' ? 'blue' : 'red']">
          {{ item.amount.toLocaleString() }}원
        </div>
      </div>
      <div class="more-button-wrap">
        <button class="more-button" @click="goToDetails">자세히 보기</button>
      </div>
      <IncomeExpenseChart :data="budget" />
      <DoughnutChart :data="budget" type="수입" class="scroll-appear" />
      <DoughnutChart :data="budget" type="지출" class="scroll-appear" />
    </section>

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
  margin-bottom: 24px;
}
.menu-btn {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
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

.list {
  border-top: 1px solid #ccc;
  padding-top: 16px;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
.left {
  display: flex;
  flex-direction: column;
}
.memo {
  font-size: 13px;
  color: #777;
}
.right {
  font-weight: bold;
}

.more-button-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.more-button {
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  cursor: pointer;
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
}
.select-wrap {
  position: relative;
  width: fit-content;
}

.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 36px 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  cursor: pointer;
  transition: border 0.2s ease;
}

.custom-select:focus {
  outline: none;
  border-color: #007aff;
  background-color: #fff;
}
</style>
