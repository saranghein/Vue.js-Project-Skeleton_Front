<script setup>
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
</script>

<template>
  <div class="container mt-4">
    <div class="row align-items-center">
      <!-- 왼쪽 아이콘 -->
      <div class="col-auto">
        <i class="fa-solid fa-chevron-left"></i>
      </div>

      <!-- 가운데 제목 -->
      <div class="col text-center">
        <span class="registry-title">거래 등록</span>
      </div>
    </div>
  </div>

  <div class="container">
    <!-- 버튼 컴포넌트 -->
    <div class="row">
      <div class="col mx-4">
        <RegistrationButton @change-type="onTypeChange" />
      </div>
    </div>
  </div>
  <div class="container">
    <!-- 날짜 선택 -->
    <div class="row">
      <div class="col">
        <span class="date-text ms-5">날짜 및 시간</span>
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
