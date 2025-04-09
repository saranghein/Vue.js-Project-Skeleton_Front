<style scoped>
.infoItemContainer {
  display: flex;
  margin-top: 32px;
  padding: 0 6px;
  align-items: center;
  justify-content: space-between;
}

.subjectText {
  font-size: 15px;
  text-align: left;
}

.subjectContent {
  font-size: 15px;
  text-align: right;
}

.subjectIcon {
  width: 24px;
  height: 24px;
  margin: 7px;
}
</style>

<template>
  <div class="infoItemContainer">
    <div class="subjectContainer">
      <i :class="[icons, 'subjectIcon']"></i>
      <span class="subjectText">{{ subject }}</span>
    </div>
    <span class="subjectContent">
      {{ contents }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  icons: {
    type: String,
    default: '',
    required: true,
  },
  subject: {
    type: String,
    default: '',
    required: true,
  },
  contents: {
    type: String,
    default: '',
    required: true,
  },
});
</script>
