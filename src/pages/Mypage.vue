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
    <img class="mypageImg" src="" alt="profile-img" />
    <div class="nameContainer">
      <span class="usernameSpan">{{ username }}</span>
      <i class="fa-solid fa-pencil editIcon"></i>
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
        :contents="'2300.01.01'"
      />
      <InfoItem
        :icons="'fa-solid fa-phone'"
        :subject="'전화번호'"
        :contents="'010-1234-5678'"
      />
      <InfoItem
        :icons="'fa-solid fa-envelope'"
        :subject="'이메일 주소'"
        :contents="'example@naver.com'"
      />
      <div class="borderline"></div>
      <img class="barcodeImg" :src="BarcodeImg" alt="barcode" />
    </section>
  </div>
</template>
<script setup>
import { COLORS } from '@/util/constants';
import Header from '@/components/common/Header.vue';
import InfoItem from '@/components/mypage/InfoItem.vue';
import BarcodeImg from '@/assets/barcode.png';

const username = '홍길동';
</script>
