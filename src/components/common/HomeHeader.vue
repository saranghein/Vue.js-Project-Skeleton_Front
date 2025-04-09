<style scoped>
.homeHeaderContainer {
  position: relative;
  width: 100%;
  height: 56px;

  display: flex;
  justify-content: left;
  align-items: center;
}
p {
  color: black;
  font-size: 18px;
}
i {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.2rem;
  width: 3.2rem;

  cursor: pointer;
}
</style>

<template>
  <div class="homeHeaderContainer" :style="{ backgroundColor: COLORS.GREEN02 }">
    <i class="fa-solid fa-bars"></i>
    <p>PAYDAY MAYDAY</p>
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
