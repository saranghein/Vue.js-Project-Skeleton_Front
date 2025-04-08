<style scoped>
.headerContainer {
  position: relative;
  width: 100dvw;
  height: 56px;

  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  color: black;
  font-size: 18px;
}
i {
  position: absolute;
  left: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.2rem;
  width: 3.2rem;

  cursor: pointer;
}
</style>

<template>
  <div class="headerContainer" :style="{ backgroundColor: COLORS.GREEN02 }">
    <i @click="navigateToHome" class="fa-solid fa-chevron-left"></i>
    <p>{{ pageName }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { COLORS } from '@/util/constants';

defineProps(['pageName']);
const router = useRouter();

function navigateToHome() {
  router.push('/');
}
</script>
