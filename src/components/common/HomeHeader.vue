<template>
  <div class="homeHeaderContainer" :style="{ backgroundColor: COLORS.GREEN02 }">
    <img src="@/assets/logo1.png" alt="Payday Mayday 로고" class="logo" />
    <i class="fa-solid fa-bars" @click="toggleSidebar"></i>
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

defineProps({ username: { type: String, required: true } });

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.homeHeaderContainer {
  position: relative;
  width: 100%;
  height: 56px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
}

.logo {
  height: 100px;
  width: auto;
  object-fit: contain;
}

i {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 3.2rem;
  width: 3.2rem;
  cursor: pointer;
}
</style>
