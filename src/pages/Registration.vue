<script setup>
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
import { ref } from 'vue';
import Button1 from '@/assets/Registration/Button1.svg';

const selectedDate = ref('');
const selectedTime = ref('');
const selectedType = ref(''); // 'income' 또는 'expense'
const inputAmount = ref('');
const onTypeChange = (type) => {
  selectedType.value = type;
};
import { onMounted } from 'vue';

import { useOptionStore } from '@/stores/useOptionStore';
import DropdownSelector from '@/components/Registration/DropdownSelector.vue';

const store = useOptionStore();

const category = ref('');
const paymentMethod = ref('');

onMounted(() => {
  store.fetchOptions();
});
</script>

<template>
  <div class="row mt-5">
    <div class="col-10 col-md-6 mx-auto">
      <div class="row align-items-center">
        <!-- 왼쪽 아이콘 -->
        <div class="col-auto pointer">
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
          :options="store.categories"
          v-model="category"
        />
      </div>
    </div>

    <!-- 내역 입력 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <label for="list" class="form-label">내역</label>
        <div class="input-group">
          <input
            type="text"
            id="list"
            class="form-control no-default-icon"
            v-model.number="inputAmount"
            placeholder="입금자 명을 입력하세요"
          />
        </div>
      </div>
    </div>

    <!-- 거래 수단 -->
    <div class="row">
      <div class="col-10 col-md-6 mx-auto">
        <DropdownSelector
          label="거래수단"
          placeholder="현금"
          :options="store.paymentMethods"
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
            v-model.number="inputAmount"
            placeholder="메모를 입력해주세요"
          />
        </div>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="row mb-2">
      <div class="col-10 col-md-6 mx-auto">
        <div>등록 버튼</div>
        <div>취소 버튼</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-text {
  font-size: 15px;
}
.registry-title {
  font-size: 16px;
  margin: 0px auto;
}
</style>
