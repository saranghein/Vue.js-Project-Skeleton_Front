<style scoped>
.sideBarContainer {
  position: fixed;
  top: 0;
  right: 0;
  width: 70dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  z-index: 20;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.sideBarContainer.active {
  transform: translateX(0);
}

.sideBarHeader {
  width: 100%;

  display: flex;
  justify-content: flex-start;

  margin: 17px 0 27px 16px;
}

img {
  width: 75px;
  height: 75px;

  margin-bottom: 12px;

  object-fit: cover;
  border-radius: 50%;
}

.sideBarButtons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
}

.sideBarProfileSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 16px;
  cursor: pointer;
}
</style>

<template>
  <div :class="['sideBarContainer', { active: isActive }]">
    <section class="sideBarHeader">
      <p>{{ username }}님, 안녕하세요!</p>
    </section>
    <section class="sideBarProfileSection">
      <img
        src=""
        alt="profile-image"
        :style="{ backgroundColor: COLORS.GRAY01 }"
      />
      <div class="sideBarButtons">
        <p @click="goToMypage">마이페이지</p>
        <p @click="goToHome">로그아웃</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { COLORS } from '@/util/constants';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['close']);

const router = useRouter();
const goToMypage = () => {
  router.push({ name: 'Mypage' });
  emit('close');
};

const goToHome = () => {
  router.push({ name: 'Home' });
  emit('close');
};

defineProps({
  username: {
    type: String,
    required: true, //유저네임 필수요소
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true, // 사이드바 활성여부 필수요소
  },
});
</script>
