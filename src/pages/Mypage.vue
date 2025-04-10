<style scoped>
.mypageContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;

  padding-bottom: 61px;
}

.mypageImgDiv {
  position: absolute;
  left: 50%;
  top: 82px;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
}

.nameContainer {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.usernameSpan {
  font-size: 18px;
}

.editIcon {
  color: gray;
  cursor: pointer;
  font-size: 12px;
}

.mypageImg {
  width: 90px;
  height: 90px;

  background-color: lightgray;

  border-radius: 50% 50%;
  border: 4px solid #55efc4;
}

.infoContainer {
  width: 323px;
  height: 475px;
  display: flex;
  flex-direction: column;

  padding: 85px 10px 17px 10px;
  margin-top: 75px;

  background-color: white;
}

.borderline {
  margin: 32px 0 27px 0;

  border: 1px solid #d9d9d9;
}

.barcodeImg {
  width: 250px;
  margin-bottom: 25px;
  align-self: center;
}
</style>
<template>
  <Header :pageName="'마이페이지'"></Header>
  <div class="mypageImgDiv">
    <img class="mypageImg" :src="defaultProfileImg" alt="profile-img" />
    <div class="nameContainer">
      <span class="usernameSpan">{{
        user?.user_id || '사용자 정보 없음'
      }}</span>
      <i class="fa-solid fa-pencil editIcon" @click="onClickEdit"></i>
    </div>
  </div>
  <div class="mypageContainer" :style="{ 'background-color': COLORS.GRAY00 }">
    <section
      class="infoContainer"
      :style="{ 'background-color': COLORS.WHITE }"
    >
      <InfoItem
        :icons="'fa-solid fa-cake-candles'"
        :subject="'생년월일'"
        :contents="user?.birth || '생년월일 정보 없음'"
      />
      <InfoItem
        :icons="'fa-solid fa-phone'"
        :subject="'전화번호'"
        :contents="user?.phone || '전화번호 정보 없음'"
      />
      <InfoItem
        :icons="'fa-solid fa-envelope'"
        :subject="'이메일 주소'"
        :contents="user?.email || '이메일 정보 없음'"
      />
      <div class="borderline"></div>
      <img class="barcodeImg" :src="BarcodeImg" alt="barcode" />
    </section>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import { COLORS } from '@/util/constants';
import Header from '@/components/common/Header.vue';
import InfoItem from '@/components/mypage/InfoItem.vue';
import BarcodeImg from '@/assets/barcode.png';
import defaultProfileImg from '@/assets/user_img/gallery07.png';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const user = ref(null);
const userId = route.params.id;

function onClickEdit() {
  router.push(`/mypage-edit/${userId}`);
}

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
