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
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <label for="category" class="form-label">카테고리</label>
        <div class="input-group">
          <input
            id="category"
            type="button"
            class="form-control"
            aria-label="Text input with segmented dropdown button"
            spellcheck="false"
            data-ms-editor="true"
            placeholder="카테고리 선택"
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-chevron-down"></i>
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">식비</a></li>
            <li><a class="dropdown-item" href="#">교통비</a></li>
            <li><a class="dropdown-item" href="#">유흥비</a></li>
            <!-- <li><hr class="dropdown-divider" /></li> -->
            <li><a class="dropdown-item" href="#">교육비k</a></li>
          </ul>
        </div>
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

    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <label for="pay" class="form-label">거래수단</label>
        <div class="input-group">
          <input
            id="pay"
            type="button"
            class="form-control"
            aria-label="Text input with segmented dropdown button"
            spellcheck="false"
            data-ms-editor="true"
            placeholder="현금"
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-chevron-down"></i>
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">신용/체크</a></li>
            <li><a class="dropdown-item" href="#">현금</a></li>
            <li><a class="dropdown-item" href="#">간편결제</a></li>
            <!-- <li><hr class="dropdown-divider" /></li> -->
            <li><a class="dropdown-item" href="#">휴대폰소액결제</a></li>
          </ul>
        </div>
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
