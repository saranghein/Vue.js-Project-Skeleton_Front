<style scoped>
.previewProfileImgWrapper {
  width: 90px;
  height: 90px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: lightgray;
  border: 2px solid #55efc4;
}

.previewProfileImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

<template>
  <div class="row mb-2">
    <div class="col-10 col-md-6 mx-auto">
      <label for="profileImg" class="form-label">⁎ 프로필 이미지</label>
      <div class="mb-3 d-flex justify-content-center align-items-center">
        <div class="rounded-circle overflow-hidden previewProfileImgWrapper">
          <img
            v-if="previewUrl"
            :src="defaultProfileImg"
            class="previewProfileImg"
            alt="프로필 이미지 미리보기"
          />
        </div>
      </div>
      <input
        id="profileImg"
        type="file"
        class="form-control"
        @change="onFileChange"
        placeholder="프로필 이미지를 업로드하세요"
      />
      <small
        class="text-danger"
        :style="{ visibility: error ? 'visible' : 'hidden' }"
      >
        프로필 이미지를 선택하세요.
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import defaultProfileImg from '@/assets/user_img/gallery07.png';

const props = defineProps({
  modelValue: String,
  error: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const previewUrl = ref(defaultProfileImg); // 미리보기 URL
let objectUrl = null; // URL.createObjectURL로 생성된 URL을 추적

// 파일 변경 핸들러
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    // 기존 URL 해제
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    objectUrl = URL.createObjectURL(file);
    previewUrl.value = objectUrl;
    // 부모 컴포넌트로 파일 객체 전달
    emit('update:modelValue', objectUrl);
  }
}

// modelValue가 변경될 때 미리보기 URL 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    previewUrl.value = newValue || '';
  },
  { immediate: true } // 컴포넌트가 로드될 때도 실행
);

// 컴포넌트가 파괴되기 전에 URL 해제
onBeforeUnmount(() => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }
});
</script>
