<script setup>
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
import { ref } from 'vue';

const selectedDate = ref('');
const selectedTime = ref('');
</script>

<template>
  <div class="container-fluid mt-4">
    <div class="row align-items-center">
      <!-- 왼쪽 아이콘 -->
      <div class="col-auto ms-2">
        <i class="fa-solid fa-chevron-left"></i>
      </div>

      <!-- 가운데 제목 -->
      <div class="col text-center">
        <span class="registry-title">거래 등록</span>
      </div>
    </div>
    <div class="row">
      <div class="col mx-4">
        <RegistrationButton @change-type="onTypeChange" />
      </div>
    </div>
    <!-- 날짜 및 시간 입력 -->
    <div class="row mb-2 mx-5">
      <div class="col mx-4">
        <label for="date" class="form-label ms-2">날짜 및 시간</label>
        <div class="input-group input-width">
          <input
            type="date"
            id="date"
            class="form-control no-default-icon"
            v-model="selectedDate"
          />
          <!-- <button
            type="date"
            class="btn btn-outline-secondary input-group-text"
          >
            <i class="fa-solid fa-calendar-days"></i> -->
          <!-- </button> -->
        </div>
      </div>
    </div>

    <div class="row mb-4 mx-5">
      <div class="col mx-4">
        <!-- <label for="time" class="form-label ms-2">시간</label> -->
        <div class="input-group input-width">
          <input
            type="time"
            id="time"
            class="form-control no-default-icon"
            v-model="selectedTime"
          />
          <!-- <span class="input-group-text">
            <i class="fa-regular fa-clock"></i>
          </span> -->
        </div>
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

/* 브라우저 기본 날짜/시간 아이콘 제거 */
/* input[type='date'].no-default-icon::-webkit-calendar-picker-indicator,
input[type='time'].no-default-icon::-webkit-calendar-picker-indicator {
  opacity: 0;
  display: none;
  -webkit-appearance: none;
} */
.input-width {
  /* width: 80%; */
  margin: 0, 100px;
}
</style>
