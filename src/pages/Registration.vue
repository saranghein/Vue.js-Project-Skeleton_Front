<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useOptionStore } from '@/stores/useOptionStore';
import { RegisterService } from '@/api/RegisterService';
import { useRoute, useRouter } from 'vue-router';

// <=== 컴포넌트 관련 ===>
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
import CategorySelector from '@/components/Registration/CategorySelector.vue';
import PaymentMethodSelector from '@/components/Registration/PaymentMethodSelector.vue';
import Button from '@/components/common/Button.vue';
import ApiService from '@/util/apiService';
import DateInput from '@/components/Registration/DateInput.vue';
import TimeInput from '@/components/Registration/TimeInput.vue';
import AmountInput from '@/components/Registration/AmountInput.vue';
import SourceInput from '@/components/Registration/SourceInput.vue';
import MemoInput from '@/components/Registration/MemoInput.vue';
// </=== 컴포넌트 관련 ===>

// <=== 변수 관련 ===>
const selectedDate = ref(''); // 날짜
const selectedTime = ref(''); // 시간
const memo = ref(''); // 메모
const depositor = ref(''); // 입금자명
const inputAmount = ref(''); // 금액
const category = ref(''); // 카테고리 선택
const paymentMethod = ref(''); // 지출 방식
const store = useOptionStore(); // 스토어 정의
const selectedType = ref('income'); // 지출인지 수입인지('income' 또는 'expense')
const selectedCategory = ref(null); // { id, name, type }
const selectedPaymentMethod = ref(null); // { id, name, type }
const isLoading = ref(false); // 초기 로딩 플래그
// </=== 변수 관련 ===>

// <===== 모달 관련 ====>
import ModalMessage from '@/components/Registration/ModalMessage.vue';

const modalVisible = ref(false);
const modalMessage = ref('');
const navigateAfterModal = ref(false);

// 메시지와 함께 모달 표시
const showModal = (message, goHome = false) => {
  modalMessage.value = message;
  navigateAfterModal.value = goHome;
  modalVisible.value = true;
};

// 확인 눌렀을 때
const handleModalConfirm = () => {
  modalVisible.value = false;
  if (navigateAfterModal.value && isEditMode) {
    router.push('/transaction-history');
  }
  router.push('/');
};

// 취소 눌렀을 때
const handleModalCancel = () => {
  modalVisible.value = false;
  // 홈 이동은 하지 않고 그대로 유지
};

const props = defineProps({
  isModal: Boolean,
});
// </==== 모달 관련 ====>

// <=== api 관련 ===>
const route = useRoute(); // 라우트
const router = useRouter(); // 라우터

const id = route.params.id; // id 값 가져옴
const isEditMode = computed(() => !!id); //id 값 있으면 편집모드
// </=== api 관련 ===>

// <=== '수입', '지출' 필터링 관련 ===>

// "수입', "지출" 변경 이벤트 핸들러
const onTypeChange = (type) => {
  selectedType.value = type;
};

// 수정시 "수입", "지출" 버튼 바꾸면 드롭다운 메뉴 초기화
watch(selectedType, () => {
  if (!isLoading.value) {
    isLoading.value = true;
    return;
  }
  selectedCategory.value = null;
  selectedPaymentMethod.value = null;
});

// 수입, 지출에 따라 출처 출력 달라지도록
const getDepositorPlaceholder = computed(() => {
  if (selectedType.value === 'income') return '수입의 출처를 입력하세요';
  if (selectedType.value === 'expense') return '사용처를 입력하세요';
  return ''; // 아무것도 선택되지 않은 경우
});
// </=== '수입', '지출' 필터링 관련 ===>

// <=== 에러 처리 관련 ===>

// 에러 상태
const errors = ref({
  date: false,
  time: false,
  amount: false,
  category: false,
  depositor: false,
});
// </=== 에러 처리 관련 ===>

// <=== 버튼 처리 관련 ===>
const handleSubmit = async () => {
  const newErrors = {
    date: !selectedDate.value,
    time: !selectedTime.value,
    amount: !inputAmount.value,
    category: !selectedCategory.value || !selectedCategory.value.name,
    depositor: !depositor.value,
  };

  errors.value = newErrors;

  const isValid = !Object.values(newErrors).some(Boolean);
  if (!isValid) return;

  // 등록 요청
  const payload = {
    user_id: 'test_user', // 테스트용 user_id 추가
    date: selectedDate.value, // 날짜
    time: selectedTime.value, // 시간
    amount: Number(inputAmount.value), // 금액
    category: selectedCategory.value?.name, // 카테고리
    source: depositor.value, // 출처
    paymentMethod: selectedPaymentMethod.value?.name || '', // 거래 수단
    memo: memo.value, // 메모
    flow_type: selectedType.value === 'income' ? '수입' : '지출', // 수입인지 지출인지
  };

  try {
    let response;

    // 편집모드라면
    if (isEditMode.value) {
      response = await RegisterService.update(id, payload);
      if (response.status >= 200 && response.status < 300) {
        showModal('수정 완료!', true);
      } else {
        showModal('수정 실패!', true);
      }
    } else {
      response = await RegisterService.create(payload);
      if (response.status >= 200 && response.status < 300) {
        showModal('등록 완료!', true);
      } else {
        showModal('등록 실패!', true);
      }
    }
  } catch (error) {
    showModal('요청 중 문제가 발생했습니다.', true);
  } finally {
    resetForm(); // 초기화
  }
};

// 뒤로가기 또는 폼 초기화
const handleCancel = () => {
  showModal('작성한 내용이 사라집니다.', true);
};
// </=== 버튼 처리 관련 ===>

// <=== 정보 로드 관련 ===>
const loadData = async () => {
  if (isEditMode.value) {
    try {
      const { data } = await ApiService.get('money', id);
      // 존재하지 않는 ID일 경우 에러처리
      if (!data) {
        throw new Error('존재하지 않는 거래입니다.');
      }
      selectedDate.value = data.date;
      selectedTime.value = data.time;
      inputAmount.value = data.amount;
      memo.value = data.memo;
      depositor.value = data.source;
      selectedType.value = data.flow_type === '수입' ? 'income' : 'expense';

      selectedCategory.value = store.categories.find(
        (cat) => cat.name === data.category
      );
      selectedPaymentMethod.value = store.paymentMethods.find(
        (pay) => pay.name === data.payment
      );
    } catch (error) {
      showModal('존재하지 않는 거래입니다.', true);
    }

    isLoading.value = false;
  }
};
// </=== 정보 로드 관련 ===>

// <=== 초기화 관련 ===>
// 초기화
const resetForm = () => {
  selectedDate.value = '';
  selectedTime.value = '';
  inputAmount.value = '';
  category.value = '';
  depositor.value = '';
  paymentMethod.value = '';
  memo.value = '';
  selectedType.value = '';
  errors.value = {
    date: false,
    time: false,
    amount: false,
    category: false,
    depositor: false,
  };
};

onMounted(() => {
  store.fetchOptions();
  loadData();
});
// </=== 초기화 관련 ===>
</script>

<template>
  <!-- 헤더 -->
  <div class="row mt-4">
    <div class="col-10-md-6 mx-auto">
      <div class="row align-items-center">
        <!-- 왼쪽 아이콘 -->
        <div class="col-auto pointer" @click="handleCancel">
          <i class="fa-solid fa-chevron-left"></i>
        </div>

        <!-- 가운데 제목 -->
        <div class="col text-center">
          <span class="registry-title">
            {{ isEditMode ? '거래 수정' : '거래 등록' }}
          </span>
        </div>

        <!-- 오른쪽 아이콘 (자리 맞추기용) -->
        <div class="col-auto pointer" style="visibility: hidden">
          <i class="fa-solid fa-chevron-left"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- 지출 버튼 -->
  <div class="row mt-5">
    <div class="col-10-md-6 mb-5">
      <div class="d-flex justify-content-center gap-2 flex-wrap">
        <div class="col-auto">
          <RegistrationButton
            bgColor="GRAY01"
            label="수입"
            :is-active="selectedType === 'income'"
            @click="onTypeChange('income')"
          />
        </div>
        <div class="col-auto">
          <RegistrationButton
            bgColor="GRAY01"
            label="지출"
            :is-active="selectedType === 'expense'"
            @click="onTypeChange('expense')"
          />
        </div>
      </div>
    </div>

    <!-- 날짜 및 시간 -->
    <!-- 날짜 -->
    <DateInput
      v-model="selectedDate"
      :error="errors.date"
      @update:modelValue="
        (val) => {
          selectedDate = val;
          if (val) errors.date = false;
        }
      "
    />

    <!-- 시간 -->
    <TimeInput
      v-model="selectedTime"
      :error="errors.time"
      @update:modelValue="
        (val) => {
          selectedTime = val;
          if (val) errors.time = false;
        }
      "
    />

    <!-- 금액 입력 -->
    <AmountInput
      v-model="inputAmount"
      :error="errors.amount"
      @update:modelValue="
        (val) => {
          inputAmount = val;
          if (val) errors.amount = false;
        }
      "
    />

    <!-- 카테고리 -->
    <CategorySelector
      v-model="selectedCategory"
      :selected-type="selectedType"
      :error="errors.category"
      @update:modelValue="
        (val) => {
          category = val;
          if (val) errors.category = false;
        }
      "
    />

    <!-- 출처 입력 -->
    <SourceInput
      v-model="depositor"
      :error="errors.depositor"
      :placeholder="getDepositorPlaceholder"
      @update:modelValue="
        (val) => {
          depositor = val;
          if (val) errors.depositor = false;
        }
      "
    />

    <!-- 거래 수단 -->
    <PaymentMethodSelector
      v-model="selectedPaymentMethod"
      :selected-type="selectedType"
    />

    <!-- 메모 입력 -->
    <MemoInput v-model="memo" />

    <!-- 버튼 -->
    <!-- 등록 버튼 -->
    <div class="row mb-2 mt-3">
      <div class="col-10-md-6 mx-auto">
        <Button
          type="button"
          :name="isEditMode ? '수정' : '등록'"
          bgColor="GREEN02"
          color="BLACK"
          :click-handler="handleSubmit"
          style="font-size: 20px"
        ></Button>
      </div>
    </div>

    <!-- 취소 버튼 -->
    <div class="row mb-4">
      <div class="col-10-md-6 mx-auto">
        <Button
          type="button"
          name="취소"
          color="WHITE"
          bgColor="GRAY01"
          :click-handler="handleCancel"
          style="font-size: 20px"
        ></Button>
      </div>
    </div>
  </div>
  <!-- 모달 등록 -->
  <ModalMessage
    :visible="modalVisible"
    :message="modalMessage"
    @confirm="handleModalConfirm"
    @cancel="handleModalCancel"
  />
</template>

<style scoped>
* {
  font-size: 20px;
  margin: 0;
}
.registry-title {
  font-size: 20px;
  margin: 0px auto;
}
</style>
