<script setup>
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
import { ref, onMounted, computed } from 'vue';
import Button1 from '@/assets/Registration/Button1.svg';
import { useOptionStore } from '@/stores/useOptionStore';
import DropdownSelector from '@/components/Registration/DropdownSelector.vue';
import Button from '@/components/common/Button.vue';
import { COLORS } from '@/util/constants';

const selectedDate = ref(''); // 날짜
const selectedTime = ref(''); // 시간
const memo = ref(''); // 메모
const depositor = ref(''); // 입금자명
const inputAmount = ref(''); // 금액

const store = useOptionStore();
const category = ref(''); //카테고리 선택
const paymentMethod = ref(''); // 지출 방식

const selectedType = ref(''); // 지출인지 수입인지('income' 또는 'expense')
const onTypeChange = (type) => {
  //이벤트 핸들러
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

  return store.paymentMethods.filter((method) => {
    return method.type === selectedType.value || method.type === 'both';
  });
});

onMounted(() => {
  store.fetchOptions();
});
</script>

<template>
  <div class="row mt-5">
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
    <div class="row mb-2">
      <div class="col-10 col-md-6 mx-auto">
        <label for="date" class="form-label">날짜 및 시간</label>
        <div class="input-group w-50">
          <input
            type="date"
            id="date"
            class="form-control"
            v-model="selectedDate"
          />
        </div>
      </div>
    </div>
    <!-- 시간 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <div class="input-group w-50">
          <input
            type="time"
            id="time"
            class="form-control"
            v-model="selectedTime"
          />
        </div>
      </div>
    </div>

    <!-- 금액 입력 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <label for="amount" class="form-label">금액</label>
        <div class="input-group">
          <input
            type="text"
            id="amount"
            class="form-control no-default-icon"
            v-model.number="inputAmount"
            placeholder="금액 입력"
            style="text-align: right"
          />
          <span class="my-2 ms-2">원</span>
        </div>
      </div>
    </div>

    <!-- 카테고리 -->
    <div class="row">
      <div class="col-10 col-md-6 mx-auto">
        <DropdownSelector
          label="카테고리"
          placeholder="카테고리 선택"
          :options="categoryOptions"
          option-label="name"
          option-value="id"
          v-model="category"
        />
      </div>
    </div>

    <!-- 출처 입력 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <label for="list" class="form-label">출처</label>
        <div class="input-group">
          <input
            type="text"
            id="list"
            class="form-control no-default-icon"
            v-model="depositor"
            :placeholder="getDepositorPlaceholder"
          />
        </div>
      </div>
    </div>

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
    <div class="row mb-2">
      <div class="col-10 col-md-6 mx-auto">
        <label for="memo" class="form-label">메모</label>
        <div class="input-group">
          <input
            type="text"
            id="memo"
            class="form-control no-default-icon"
            v-model.number="memo"
            placeholder="메모를 입력해주세요"
          />
        </div>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="row mb-2 mt-3">
      <div class="col-10 col-md-6 mx-auto">
        <Button name="등록" bgColor="GREEN02" color="BLACK"></Button>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-10 col-md-6 mx-auto">
        <Button name="취소" color="WHITE"></Button>
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
