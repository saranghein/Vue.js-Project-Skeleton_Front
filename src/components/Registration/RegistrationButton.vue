<script setup></script>
<template>
  <div class="d-flex justify-content-center gap-2 my-3">
    <div class="btn-container" @click="">
      <img
        src="@/assets/Registration/Button1.svg"
        alt="수입"
        class="btn-image"
      />
      <span class="btn-label">수입</span>
    </div>
    <div class="btn-container" @click="">
      <img
        src="@/assets/Registration/Button1.svg"
        alt="지출"
        class="btn-image"
      />
      <span class="btn-label">지출</span>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 58px;
}
.btn-container {
  position: relative;
  width: 64px;
  height: 64px;
  cursor: pointer;
  margin: 20px;
}

.btn-image {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}

.btn-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-size: 14px;
  font-weight: 600;
  color: #6c6c6c;
  pointer-events: none; /* 클릭 방해 안되도록 */
}
</style>
