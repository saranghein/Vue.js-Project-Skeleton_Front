<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.homeHeaderContainer {
  position: relative;
  width: 100dvw;
  height: 56px;

  display: flex;
  justify-content: left;
  align-items: center;
}
p {
  color: black;
  font-size: 18px;
  margin: 0;
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
    <i class="fa-solid fa-bars" @click="toggleSidebar"></i>
    <p>PAYDAY MAYDAY</p>
  </div>
  <Sidebar
    :isActive="isSidebarOpen"
    :username="username"
    @close="toggleSidebar"
  />
  <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '@/components/common/Sidebar.vue';
import { COLORS } from '@/util/constants';

defineProps({ username: { type: String, required: true } }); //사이드바에 넣을 유저네임 필수요소
const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>
