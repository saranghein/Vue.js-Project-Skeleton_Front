<script setup>
import { computed } from 'vue';
const props = defineProps({
  label: String, // 라벨 이름
  placeholder: String, // 기본 표시 텍스트
  options: Array, // 드롭다운 항목 배열
  modelValue: [String, Number], // v-model 바인딩용
  optionValue: {
    type: String,
    default: 'id',
  },
  optionLabel: {
    type: String,
    default: 'name',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const selectOption = (value) => {
  emit('update:modelValue', value);
};
// option label 기준으로 출력되도록
const selectedLabel = computed(() => {
  const match = props.options.find(
    (opt) => opt[props.optionValue] === props.modelValue
  );
  return match ? match[props.optionLabel] : '';
});
</script>

<template>
  <div class="mb-4">
    <label class="form-label">{{ label }}</label>
    <div class="input-group">
      <input
        type="button"
        class="form-control"
        :value="selectedLabel || placeholder"
        readonly
        data-bs-toggle="dropdown"
        style="text-align: left"
      />
      <button
        type="button"
        class="btn btn-outline-secondary"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa-solid fa-chevron-down"></i>
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li v-for="(option, idx) in options" :key="option[optionValue]">
          <span
            class="dropdown-item"
            href="#"
            @click.prevent="selectOption(option[optionValue])"
          >
            {{ option[optionLabel] }}
          </span>
        </li>
      </ul>
    </div>
    <!-- 에러 메시지 -->
    <small v-if="!modelValue && errorMessage" class="text-danger ms-1">
      {{ errorMessage }}
    </small>
    <small
      v-else
      class="text-danger ms-1"
      :style="{
        visibility: 'hidden',
      }"
    >
      {{ errorMessage }}
    </small>
  </div>
</template>
