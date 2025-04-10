<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useOptionStore } from '@/stores/useOptionStore';
import Button from '@/components/common/Button.vue';

const selectedBirthday = ref(''); // 생년월일
const inputProfileImg = ref(''); // 프로필 이미지
const inputEmail = ref(''); // 이메일 주소
const inputPhone = ref(''); // 전화번호
const inputUsername = ref(''); // 사용자 이름
// const store = useOptionStore(); // 스토어 정의

import UsernameInput from '@/components/mypageEdit/UsernameInput.vue';
import PhoneNumberInput from '@/components/mypageEdit/PhoneNumberInput.vue';
import EmailInput from '@/components/mypageEdit/EmailInput.vue';
import Header from '@/components/common/Header.vue';
import ProfileImgInput from '@/components/mypageEdit/ProfileImgInput.vue';
import BirthdayInput from '@/components/mypageEdit/BirthdayInput.vue';

//이벤트 핸들러
const onTypeChange = (type) => {
  selectedType.value = type;
};

// 에러 상태
const errors = reactive({
  birthday: false,
  username: false,
  email: false,
  phone: false,
  profileImg: false,
});

// 모든 입력값이 유효한지 확인하는 계산된 속성
const isFormValid = computed(() => {
  return (
    selectedBirthday.value &&
    inputProfileImg.value &&
    inputEmail.value &&
    inputPhone.value &&
    inputUsername.value &&
    !Object.values(errors).some((error) => error)
  );
});

// 등록 버튼 클릭했을 때 유효성 검사
const handleSubmit = () => {
  const newErrors = {
    birthday: !selectedBirthday.value,
    username: !inputUsername.value,
    email: !inputEmail.value,
    phone: errors.phone, // PhoneNumberInput에서 전달된 에러 상태 사용
    profileImg: !inputProfileImg.value,
  };

  Object.assign(errors, newErrors);

  if (Object.values(newErrors).some(Boolean)) {
    alert('입력값을 확인해주세요.');
    return;
  }

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
    <ProfileImgInput v-model="inputProfileImg" :error="errors.profileImg" />

    <!-- 이름 입력 -->
    <UsernameInput v-model="inputUsername" :error="errors.username" />

    <!-- 생년월일 입력-->
    <BirthdayInput v-model="selectedBirthday" :error="errors.birthday" />

    <!-- 전화번호 입력-->
    <PhoneNumberInput
      v-model="inputPhone"
      :error="errors.phone"
      @update:error="(value) => (errors.phone = value)"
    />

    <!-- 이메일 주소 입력 -->
    <EmailInput
      v-model="inputEmail"
      :error="errors.email"
      @update:error="(value) => (errors.email = value)"
    />
    <!-- 등록 버튼(입력 조건 만족했을 때만 버튼 활성화) -->
    <div class="row mb-2 mt-3">
      <div class="col-10 col-md-6 mx-auto">
        <Button
          type="button"
          name="등록"
          :bgColor="isFormValid ? 'GREEN02' : 'GRAY01'"
          color="BLACK"
          :click-handler="handleSubmit"
          :disabled="!isFormValid"
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
          :click-handler="handleCancel"
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
