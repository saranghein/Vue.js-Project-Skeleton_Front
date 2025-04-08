<template>
  <article class="transaction-item">
    <div class="transaction-item__left">
      <img class="transaction-item__img" src="" alt="" />
      <div class="transaction-item__content">
        <p class="transaction-item__title">거래명</p>
        <p class="transaction-item__desc">2025.04.07 | 메모메모</p>
      </div>
    </div>
    <div class="transaction-item__right">
      <p class="transaction-item__amount">00,000원</p>
      <i class="fa-solid fa-ellipsis-vertical" style="color: #aeaeae"></i>
    </div>
  </article>
</template>

<style scoped>
.transaction-item {
  display: flex;
  justify-content: space-between;
}

.transaction-item__left {
  display: flex;
  align-items: center;
}

.transaction-item__content {
  margin-left: 12px;
}

.transaction-item__img {
  clip-path: circle(50%);
  height: 42px;
  background-color: gray;
  width: 42px;
}

.transaction-item__title {
  font-size: 16px;
  padding: 0;
  margin: 0;
}

.transaction-item__desc {
  font-size: 10px;
  color: #8d8d8d;
  padding: 0;
  margin: 4px 0 0 0;
}

.transaction-item__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.transaction-item__amount {
  margin-right: 12px;
}
</style>

<script setup></script>
