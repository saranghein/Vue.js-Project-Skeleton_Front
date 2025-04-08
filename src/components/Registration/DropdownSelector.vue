<!-- src/components/Registration/DropdownSelector.vue -->
<script setup>
defineProps({
  label: String, // 라벨 이름
  placeholder: String, // 기본 표시 텍스트
  options: Array, // 드롭다운 항목 배열
  modelValue: String, // v-model 바인딩용
});
const emit = defineEmits(['update:modelValue']);

const selectOption = (value) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="mb-4">
    <label class="form-label">{{ label }}</label>
    <div class="input-group">
      <input
        type="button"
        class="form-control"
        :placeholder="modelValue || placeholder"
        readonly
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
        <li v-for="(option, idx) in options" :key="option.id">
          <a
            class="dropdown-item"
            href="#"
            @click.prevent="selectOption(option.name)"
          >
            {{ option.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
