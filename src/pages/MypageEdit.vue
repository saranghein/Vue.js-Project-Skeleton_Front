<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import Button from '@/components/common/Button.vue';

const user = ref(null);
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const selectedBirthday = ref(''); // 생년월일
const inputProfileImg = ref('gallery07.png'); // 이미지 링크
const inputEmail = ref(''); // 이메일 주소
const inputPhone = ref(''); // 전화번호
const inputUsername = ref(''); // 사용자 이름

import UsernameInput from '@/components/mypageEdit/UsernameInput.vue';
import PhoneNumberInput from '@/components/mypageEdit/PhoneNumberInput.vue';
import EmailInput from '@/components/mypageEdit/EmailInput.vue';
import Header from '@/components/common/Header.vue';
import ProfileImgInput from '@/components/mypageEdit/ProfileImgInput.vue';
import BirthdayInput from '@/components/mypageEdit/BirthdayInput.vue';

// 에러 상태
const errors = reactive({
  birthday: true,
  username: true,
  email: true,
  phone: true,
  profileImg: false,
});

function routeToMypage() {
  router.push(`/mypage/${user.value.id}`);
}

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
const handleSubmit = async () => {
  const newErrors = {
    birthday: errors.birthday,
    username: errors.username,
    email: errors.email,
    phone: errors.phone,
    profileImg: errors.profileImg,
  };

  Object.assign(errors, newErrors);

  if (Object.values(newErrors).some(Boolean)) {
    alert('입력값을 확인해주세요.');
    return;
  }

  try {
    const updatedData = {
      birth: selectedBirthday.value,
      profileImg: inputProfileImg.value,
      email: inputEmail.value,
      phone: inputPhone.value,
      user_id: inputUsername.value,
      user_pw: 'securepassword',
    };

    const userId = 1;

    await userStore.updateUser(userId, updatedData);
    alert('등록 완료!');
    routeToMypage();
  } catch (error) {
    console.error('업데이트 실패:', error);
    alert('업데이트 중 오류가 발생했습니다.');
  }
};

// 뒤로가기 또는 폼 초기화
const handleCancel = () => {
  //TODO: API 연결
  console.log('취소 클릭');
};

// 컴포넌트가 마운트될 때 사용자 정보 가져오기
onMounted(async () => {
  const userId = route.params.id;
  if (!userId) {
    console.error('유저 ID가 전달되지 않았습니다.');
    return;
  }
  try {
    user.value = await userStore.fetchUsers(userId);

    // 데이터가 로드된 후 초기값 설정
    selectedBirthday.value = user.value.birth || '';
    inputProfileImg.value = user.value.profileImg || '';
    inputEmail.value = user.value.email || '';
    inputPhone.value = user.value.phone || '';
    inputUsername.value = user.value.user_id || '';
  } catch (error) {
    console.error('유저 정보를 가져오는 중 오류 발생:', error);
  }
});
</script>

<template>
  <Header :pageName="'마이페이지 수정'" :whiteBg="true" id="1"></Header>
  <div class="row mt-3">
    <!-- 프로필 이미지 입력 -->
    <ProfileImgInput v-model="inputProfileImg" :error="errors.profileImg" />

    <!-- 이름 입력 -->
    <UsernameInput
      v-model="inputUsername"
      :error="errors.username"
      @update:error="(value) => (errors.username = value)"
    />

    <!-- 생년월일 입력-->
    <BirthdayInput
      v-model="selectedBirthday"
      :error="errors.birthday"
      @update:error="(value) => (errors.birthday = value)"
    />

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
