<script setup>
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
import { ref, onMounted, computed } from 'vue';
import Button1 from '@/assets/Registration/Button1.svg';
import { useOptionStore } from '@/stores/useOptionStore';
import DropdownSelector from '@/components/Registration/DropdownSelector.vue';
import Button from '@/components/common/Button.vue';
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
//이벤트 핸들러
const onTypeChange = (type) => {
  selectedType.value = type;
};

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

// 등록 버튼 클릭했을 때 유효성 검사
const handleSubmit = () => {
  const newErrors = {
    date: !selectedDate.value,
    time: !selectedTime.value,
    amount: !inputAmount.value,
    category: !category.value,
    depositor: !depositor.value,
  };

  errors.value = newErrors;

  if (Object.values(newErrors).some(Boolean)) return;

  alert('등록 완료!');
};

// 뒤로가기 또는 폼 초기화
const handleCancel = () => {
  //TODO: API 연결
  console.log('취소 클릭');
};
onMounted(() => {
  store.fetchOptions();
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
          <span class="registry-title">거래 등록</span>
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
    <DateInput v-model="selectedDate" :error="errors.date" />

    <!-- 시간 -->
    <TimeInput v-model="selectedTime" :error="errors.time" />

    <!-- 금액 입력 -->
    <AmountInput v-model="inputAmount" :error="errors.amount" />

    <!-- 카테고리 -->
    <div class="row">
      <div class="col-10 col-md-6 mx-auto">
        <DropdownSelector
          :class="{ shake: errors.category }"
          label="⁎ 카테고리"
          placeholder="카테고리 선택"
          :options="categoryOptions"
          option-label="name"
          option-value="id"
          v-model="category"
          error-message="카테고리를 선택해 주세요"
        />
      </div>
    </div>

    <!-- 출처 입력 -->
    <SourceInput
      v-model="depositor"
      :error="errors.depositor"
      :placeholder="getDepositorPlaceholder"
    />

    <!-- 거래 수단 -->
    <div class="row">
      <div class="col-10 col-md-6 mx-auto">
        <DropdownSelector
          label="거래수단"
          placeholder="거래수단 선택"
          :options="paymentMethodOptions"
          option-label="name"
          option-value="id"
          v-model="paymentMethod"
        />
      </div>
    </div>

    <!-- 메모 입력 -->
    <MemoInput v-model="memo" />

    <!-- 버튼 -->
    <!-- 등록 버튼 -->
    <div class="row mb-2 mt-3">
      <div class="col-10 col-md-6 mx-auto">
        <Button
          type="button"
          name="등록"
          bgColor="GREEN02"
          color="BLACK"
          :click-handler="handleSubmit()"
        ></Button>
      </div>
    </div>

    <!-- 취소 버튼 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <Button
          name="취소"
          color="WHITE"
          bgColor="GRAY01"
          :click-handler="handleCancel()"
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
