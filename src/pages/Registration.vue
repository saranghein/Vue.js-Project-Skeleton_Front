<script setup>
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
import { ref, onMounted, computed, watch } from 'vue';
import Button1 from '@/assets/Registration/Button1.svg';
import { useOptionStore } from '@/stores/useOptionStore';
import { RegisterService } from '@/api/RegisterService';
import { useRoute, useRouter } from 'vue-router';
import CategorySelector from '@/components/Registration/CategorySelector.vue';
import PaymentMethodSelector from '@/components/Registration/PaymentMethodSelector.vue';
import Button from '@/components/common/Button.vue';
import ApiService from '@/util/apiService';
import DateInput from '@/components/Registration/DateInput.vue';
const selectedDate = ref(''); // 날짜
const selectedTime = ref(''); // 시간
const memo = ref(''); // 메모
const depositor = ref(''); // 입금자명
const inputAmount = ref(''); // 금액
const category = ref(''); // 카테고리 선택
const paymentMethod = ref(''); // 지출 방식
const store = useOptionStore(); // 스토어 정의
const selectedType = ref(''); // 지출인지 수입인지('income' 또는 'expense')
import TimeInput from '@/components/Registration/TimeInput.vue';
import AmountInput from '@/components/Registration/AmountInput.vue';
import SourceInput from '@/components/Registration/SourceInput.vue';
import MemoInput from '@/components/Registration/MemoInput.vue';
const selectedCategory = ref(null); // { id, name, type }
const selectedPaymentMethod = ref(null); // { id, name, type }
const isLoading = ref(false); // 초기 로딩 플래그

//이벤트 핸들러
const onTypeChange = (type) => {
  selectedType.value = type;
};
// 라우트, 라우터
const route = useRoute();
const router = useRouter();

const id = route.params.id; // id 값 가져옴
const isEditMode = computed(() => !!id); //id 값 있으면 편집모드

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

// 수입, 지출에 따라 카테고리 출력 달라지도록
const categoryOptions = computed(() => {
  if (!selectedType.value) return [];

  return store.categories.filter((cat) => {
    return cat.type === selectedType.value || cat.type === 'both';
  });
});

// 수입, 지출에 따라 거래수단 출력 달라지도록
const paymentMethodOptions = computed(() => {
  if (!selectedType.value) return [];

  return store.paymentMethods.filter((pay) => {
    return pay.type === selectedType.value || pay.type === 'both';
  });
});

// 에러 상태
const errors = ref({
  date: false,
  time: false,
  amount: false,
  category: false,
  depositor: false,
});

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
    category: category.value?.name, // 카테고리
    source: depositor.value, // 출처
    paymentMethod: paymentMethod.value?.name || '', // 거래 수단
    memo: memo.value, // 메모
    flow_type: selectedType.value === 'income' ? '수입' : '지출', // 수입인지 지출인지
  };

  try {
    // 편집모드라면
    if (isEditMode.value) {
      await RegisterService.update(id, payload);
      // 팝업
      alert('수정 완료!');
    } else {
      const response = await RegisterService.create(payload);
      console.log('등록 성공:', response.data);
    }

    resetForm(); // 초기화
    router.push('/');
    // TODO:팝업띄우고->홈화면으로
  } catch (error) {
    console.error('요청 실패:', error);
  }
};

// 정보 가져오기
const loadData = async () => {
  if (isEditMode.value) {
    try {
      const { data } = await ApiService.get('money', id);
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
      console.error('데이터 불러오기 실패:', error);
    }

    isLoading.value = false;
  }
};
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

// 뒤로가기 또는 폼 초기화
const handleCancel = () => {
  //TODO: 팝업띄우기
  router.push('/');
  console.log('취소 클릭');
};
onMounted(() => {
  store.fetchOptions();
  loadData();
});
</script>

<template>
  <div class="row mt-5">
    <!-- 헤더 -->
    <div class="col-10 col-md-6 mx-auto">
      <div class="row align-items-center">
        <!-- 왼쪽 아이콘 -->
        <div class="col-auto pointer" @click="">
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

    <!-- 지출 버튼 -->
    <div class="d-flex justify-content-center my-3 px-3">
      <RegistrationButton
        label="수입"
        :image="Button1"
        :is-active="selectedType === 'income'"
        @click="onTypeChange('income')"
      />
      <RegistrationButton
        label="지출"
        :image="Button1"
        :is-active="selectedType === 'expense'"
        @click="onTypeChange('expense')"
      />
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
      <div class="col-10 col-md-6 mx-auto">
        <Button
          type="button"
          :name="isEditMode ? '수정' : '등록'"
          bgColor="GREEN02"
          color="BLACK"
          :click-handler="handleSubmit"
        ></Button>
      </div>
    </div>

    <!-- 취소 버튼 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <Button
          type="button"
          name="취소"
          color="WHITE"
          bgColor="GRAY01"
          :click-handler="handleCancel"
        ></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-text {
  font-size: 16px;
}
.registry-title {
  font-size: 18px;
  margin: 0px auto;
}
</style>
