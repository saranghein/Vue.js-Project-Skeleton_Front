<style scoped>
.headerContainer {
  position: sticky;
  width: 100dvw;
  height: 56px;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}
p {
  color: black;
  font-size: 18px;
  margin: 0;
  vertical-align: middle;
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
  <div
    class="headerContainer"
    :style="{
      backgroundColor: whiteBg ? 'white' : COLORS.GREEN02,
      borderBottom: whiteBg ? `1px solid ${COLORS.GRAY01}` : '',
    }"
  >
    <i @click="navigateToHome" class="fa-solid fa-chevron-left"></i>
    <p>{{ pageName }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { COLORS } from '@/util/constants';

defineProps({
  pageName: {
    type: String,
    required: true, // pageName만 필수요소
  },
  whiteBg: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();

function navigateToHome() {
  router.push('/');
}
</script>
