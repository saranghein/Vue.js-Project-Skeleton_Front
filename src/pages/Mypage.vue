<style scoped></style>
<template>
	<!-- <Header :pageName="'마이페이지'"></Header> -->
	<Sidebar :username="'홍길동'"></Sidebar>
	<Button :bgColor="'GREEN02'" :color="'BLACK'" :name="'등록'"></Button>
</template>
<script setup>
import Sidebar from "@/components/common/Sidebar.vue";
import Header from "@/components/common/Header.vue";
import Button from "@/components/common/Button.vue";
</script>
