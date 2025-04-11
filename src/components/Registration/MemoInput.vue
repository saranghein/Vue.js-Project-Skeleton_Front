<template>
  <div class="row mb-3">
    <div class="col-10-md-6">
      <label for="memo" class="form-label">메모</label>
      <div class="input-group">
        <input
          type="text"
          id="memo"
          class="form-control no-default-icon"
          :value="modelValue"
          @input="onInput"
          placeholder="메모를 입력해주세요"
        />
      </div>
      <small class="text-muted"> {{ modelValue.length }}/30자 </small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const onInput = (e) => {
  const value = e.target.value.slice(0, 30); // 30자 제한
  e.target.value = value;
  emit('update:modelValue', value);
};
</script>
