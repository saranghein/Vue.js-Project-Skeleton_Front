<script setup>
import { ref, onMounted, computed } from 'vue';
import { useOptionStore } from '@/stores/useOptionStore';
import Button from '@/components/common/Button.vue';
import DateInput from '@/components/Registration/DateInput.vue';

const selectedBirthday = ref(''); // 생년월일
const inputProfileImg = ref(''); // 프로필 이미지
const inputEmail = ref(''); // 이메일 주소
const inputPhone = ref(''); // 전화번호
const inputUsername = ref(''); // 사용자 이름
const store = useOptionStore(); // 스토어 정의

import UsernameInput from '@/components/mypageEdit/UsernameInput.vue';
import PhoneNumberInput from '@/components/mypageEdit/PhoneNumberInput.vue';
import EmailInput from '@/components/mypageEdit/EmailInput.vue';
import Header from '@/components/common/Header.vue';

//이벤트 핸들러
const onTypeChange = (type) => {
  selectedType.value = type;
};

// 에러 상태
const errors = ref({
  birtday: false,
  username: false,
  email: false,
  phone: false,
  profileImg: false,
});

// 등록 버튼 클릭했을 때 유효성 검사
const handleSubmit = () => {
  const newErrors = {
    birtday: !selectedBirthday.value,
    username: !inputUsername.value,
    email: !inputEmail.value,
    phone: !inputPhone.value,
    profileImg: !inputProfileImg.value,
  };

  errors.value = newErrors;

  if (Object.values(newErrors).some(Boolean)) return;

  alert('등록 완료!');
};

// 뒤로가기 또는 폼 초기화
const handleCancel = () => {
  //TODO: API 연결
  console.log('취소 클릭');
};

onMounted(() => {
  // 초기 데이터 로드 (예: 사용자 정보 가져오기)
  // TODO: userStore.fetchUser(userId.value) 등을 호출하여 초기화
});
</script>

<template>
  <Header :pageName="'마이페이지 수정'" :whiteBg="true"></Header>
  <div class="row mt-5">
    <!-- 프로필 이미지 입력 -->
    <div class="row mb-2">
      <div class="col-10 col-md-6 mx-auto">
        <label for="profileImg" class="form-label">⁎ 프로필 이미지</label>
        <div class="mb-3 d-flex justify-content-center align-items-center">
          <div
            class="rounded-circle overflow-hidden"
            style="
              width: 150px;
              height: 150px;
              border: 2px solid #ccc;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <img
              :src="inputProfileImg ? URL.createObjectURL(inputProfileImg) : ''"
              alt="프로필 이미지 미리보기"
              style="width: 100%; height: 100%; object-fit: cover"
            />
          </div>
        </div>
        <input
          id="profileImg"
          type="file"
          class="form-control"
          v-on:change="inputProfileImg = $event.target.files[0]"
          placeholder="프로필 이미지를 업로드하세요"
        />
        <small
          class="text-danger"
          :style="{ visibility: errors.profileImg ? 'visible' : 'hidden' }"
        >
          프로필 이미지를 선택하세요.
        </small>
      </div>
    </div>

    <!-- 이름 입력 -->
    <UsernameInput
      v-model="inputUsername"
      :error="errors.username"
      :placeholder="getDepositorPlaceholder"
    />

    <!-- 생년월일 입력-->
    <DateInput v-model="selectedBirthday" :error="errors.date" />

    <!-- 전화번호 입력-->
    <PhoneNumberInput v-model="inputPhone" />

    <!-- 이메일 주소 입력 -->
    <EmailInput v-model="inputEmail" />
    <!-- 등록 버튼 -->
    <div class="row mb-2 mt-3">
      <div class="col-10 col-md-6 mx-auto">
        <Button
          type="button"
          name="등록"
          bgColor="GREEN02"
          color="BLACK"
          :click-handler="handleSubmit()"
        ></Button>
      </div>
    </div>

    <!-- 취소 버튼 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mx-auto">
        <Button
          name="취소"
          color="WHITE"
          bgColor="GRAY01"
          :click-handler="handleCancel()"
        ></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-text {
  font-size: 16px;
}
.registry-title {
  font-size: 18px;
  margin: 0px auto;
}
</style>
