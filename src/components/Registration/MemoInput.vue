<template>
  <div class="row mb-4">
    <div class="col-10 col-md-6 mx-auto">
      <label for="memo" class="form-label">메모</label>
      <div class="input-group">
        <input
          type="text"
          id="memo"
          class="form-control no-default-icon"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder="메모를 입력해주세요"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
defineEmits(['update:modelValue']);
</script>
