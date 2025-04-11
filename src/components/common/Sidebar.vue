<style scoped>
.sideBarContainer {
  position: fixed;
  top: 15px;
  right: 15px;
  width: 70dvw;
  max-width: 400px;
  /* width: 400px; */
  height: 40dvh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  z-index: 20;

  transform-origin: top right;
  transform: scale(0);
  transition: transform 0.3s ease-in-out;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  /* border-bottom-left-radius: 20px; */
}

.sideBarContainer.active {
  /* transform: translateX(0); */
  transform: scaleX(1);
}

.sideBarHeader {
  width: 100%;

  display: flex;
  justify-content: flex-start;

  margin: 17px -20px 27px 16px;

  /* font-size: 18px;
  font-weight: bold;
  color: #333; */
}

img {
  width: 75px;
  height: 75px;

  margin-bottom: 12px;

  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #eee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
.sideBarButtons p {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.sideBarButtons p:hover {
  background-color: #8bbfff;
}
</style>

<template>
  <div :class="['sideBarContainer', { active: isActive }]">
    <section class="sideBarHeader">
      <p>{{ user?.user_id || user_id }}님, 안녕하세요!</p>
    </section>
    <section class="sideBarProfileSection">
      <img
        :src="defaultProfileImg"
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
import { defineProps, defineEmits, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import defaultProfileImg from '@/assets/user_img/gallery07.png';

const emit = defineEmits(['close']);

const router = useRouter();
const userStore = useUserStore();
const userId = 1;
const user = ref(null);

const goToMypage = () => {
  router.push('/mypage/1');
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

// 컴포넌트가 마운트될 때 사용자 정보 가져오기
onMounted(async () => {
  if (!userId) {
    console.error('유저 ID가 전달되지 않았습니다.');
    return;
  }
  try {
    user.value = await userStore.fetchUsers(userId);
  } catch (error) {
    console.error('유저 정보를 가져오는 중 오류 발생:', error);
  }
});
</script>
