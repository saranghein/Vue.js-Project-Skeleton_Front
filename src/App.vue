<template>
  <Analytics />
  <router-view />
</template>

<script setup>
import { Analytics } from '@vercel/analytics/vue';
</script>
