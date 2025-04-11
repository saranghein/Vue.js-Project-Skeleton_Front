<template>
  <div class="layout">
    <header>
      <Header :pageName="'거래 내역'" />
    </header>

    <main>
      <transaction-summary
        class="transaction-summary"
        :selectedType="selectedType"
        :calculateTotalAmount="calculateTotalAmount"
        :sumTransactionsAmount="sumTransactionsAmount"
        @selectType="selectType"
      />

      <section
        class="transaction-list"
        :style="{ backgroundColor: COLORS.WHITE }"
      >
        <div class="transaction-list__filter pointer" @click="openFilterModal">
          <span
            class="transaction-list__filter__label"
            :style="{ color: COLORS.GRAY02 }"
          >
            {{ filters.type || '전체' }} | {{ filters.category || '전체' }} |
            {{ filters.date || '최신순' }}
          </span>
          <i
            class="fa-solid fa-angle-down icon"
            style="color: #dedede; padding: 6px; margin-right: 25px"
          />
        </div>

        <empty-view v-if="filteredTransactions.length === 0" />

        <transaction-list
          v-else
          :transactions="filteredTransactions"
          @open="openEditModal"
        />
      </section>

      <filter-bottom-modal
        :type="filters.type"
        :isOpen="isFilterModalOpen"
        @close="closeFilterModal"
      />

      <bottom-modal
        :isOpen="isEditModalOpen"
        @close="closeEditModal"
        @delete="deleteTransaction"
        @edit="goToRegister"
      />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  background-color: v-bind('COLORS.GREEN02');
}

main {
  display: flex;
  flex-direction: column;
}

.transaction-list {
  width: 100%;
  margin-top: 15px;
  padding-top: 15px;
  border-radius: 16px 16px 0 0;
}

.transaction-list__filter {
  display: flex;
  align-items: center;
  justify-content: right;

  width: 100%;
  margin-left: auto;
  margin-top: 15px;
}

.transaction-list__filter__label {
  font-size: 12px;
}

@media (min-width: 768px) {
  .layout {
    background-color: #fdfdfd;
  }

  main {
    display: flex;
    flex-direction: row;

    width: 100%;
    max-width: 1200px;
    margin: 50px auto;
    gap: 10px;
  }

  .transaction-summary {
    flex: 1 1 40%;
    align-self: flex-start;

    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .transaction-list {
    flex: 1 1 60%;
    overflow-y: scroll;

    margin-top: 0;
    height: 600px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 16px;
  }

  .transaction-list__filter__label {
    font-size: 14px;
  }
}
</style>

<script setup>
import Header from '@/components/common/Header.vue';
import TransactionList from '@/components/transactionHistory/TransactionList.vue';
import TransactionSummary from '@/components/transactionHistory/TransactionSummary.vue';
import EmptyView from '@/components/transactionHistory/EmptyView.vue';
import FilterBottomModal from '@/components/transactionHistory/FilterBottomModal.vue';
import BottomModal from '@/components/transactionHistory/BottomModal.vue';
import { COLORS } from '@/util/constants';
import { reactive, ref, onMounted, computed } from 'vue';
import { TransactionService } from '@/util/apiService';
import { useRouter } from 'vue-router';

const router = useRouter();

// 필터 및 모달 상태
const isFilterModalOpen = ref(false);
const isEditModalOpen = ref(false);

// 전체 거래 데이터
const transactions = ref([]);

// 수정 또는 삭제할 거래의 ID
const transactionId = ref(null);

// 필터 조건 상태
const filters = reactive({
  type: null, // 수입 or 지출
  category: null, // 카테고리 (식비, 교통 등)
  date: null, // 정렬 순서 (최신순, 오래된 순)
});

// 선택된 거래 타입 (예: '수입', '지출')
const selectedType = computed(() => filters.type || '전체');

// 마운트 시 거래 내역 로딩
onMounted(() => {
  fetchTransactions();
});

/**
 * 거래 내역 전체 조회
 * @description 모든 거래 데이터를 API에서 가져옴
 */
const fetchTransactions = async () => {
  try {
    const response = await TransactionService.get();
    transactions.value = response.data;
  } catch (error) {
    console.error('거래내역 가져오기 실패:', error);
  }
};

/**
 * 필터 조건에 따른 거래 리스트 반환
 * @returns {Array} 필터링 및 정렬된 거래 배열
 */
const filteredTransactions = computed(() => {
  return transactions.value
    .filter((tx) => {
      if (filters.type && filters.type !== '전체') {
        return tx.flow_type === filters.type;
      }
      return true;
    })
    .filter((tx) => {
      if (filters.category && filters.category !== '전체') {
        return tx.category === filters.category;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (filters.date === '오래된 순') return dateA - dateB;
      return dateB - dateA;
    });
});

/**
 * 수입/지출 타입 선택 시 필터 변경
 * @param {string} type - 선택된 타입 ('수입' 또는 '지출')
 */
const selectType = (type) => {
  if (filters.type !== type) {
    filters.category = '전체'; // 타입 변경 시 카테고리 초기화
  }
  filters.type = type;
};

/**
 * 거래 삭제
 * @description 선택된 거래 ID를 기준으로 삭제
 */
const deleteTransaction = async () => {
  try {
    await TransactionService.delete(transactionId.value);
    transactions.value = transactions.value.filter(
      (tx) => tx.id !== transactionId.value
    );
  } catch (error) {
    console.error('거래내역 삭제 실패:', error);
  }
};

/**
 * 특정 타입(수입 or 지출)의 총 금액 계산
 * @param {string} type - '수입' 또는 '지출'
 * @returns {number} 총 금액
 */
const sumTransactionsAmount = (type) => {
  return transactions.value
    .filter((tx) => tx.flow_type === type)
    .reduce((acc, tx) => acc + tx.amount, 0);
};

/**
 * 전체 수입과 지출 차이를 계산하여 사용자 메시지 반환
 * @returns {string} 요약 문구
 */
const calculateTotalAmount = () => {
  const total = sumTransactionsAmount('수입') - sumTransactionsAmount('지출');
  if (total > 0) {
    return `💰 ${total}원 벌었어요`;
  } else if (total < 0) {
    return `😢 ${-total}원 더 썼어요 ㅠㅠ`;
  } else {
    return '수입과 지출이 같아요';
  }
};

/**
 * 필터 모달 열기
 */
const openFilterModal = () => {
  isFilterModalOpen.value = true;
};

/**
 * 거래 수정 모달 열기
 * @param {number|string} id - 거래 ID
 */
const openEditModal = (id) => {
  isEditModalOpen.value = true;
  transactionId.value = id;
};

/**
 * 필터 모달 닫기 및 필터 값 저장
 * @param {object} selectedFilters - 선택된 필터들
 */
const closeFilterModal = (selectedFilters) => {
  isFilterModalOpen.value = false;
  filters.type = selectedFilters.type;
  filters.category = selectedFilters.category;
  filters.date = selectedFilters.date;
};

/**
 * 거래 수정 모달 닫기
 */
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

/**
 * 거래 등록 페이지로 이동
 */
const goToRegister = () => {
  router.push(`/register/${transactionId.value}`);
};
</script>
