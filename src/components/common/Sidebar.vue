<style scoped>
.sideBarContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70dvw;
	height: 100dvh;

	background-color: white;
}

.sideBarHeader {
	width: 100%;

	display: flex;
	justify-content: flex-start;

	margin: 17px 0 27px 16px;
}

img {
	width: 75px;
	height: 75px;

	margin-bottom: 12px;

	object-fit: cover;
	border-radius: 50%;
}

.sideBarButtons {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 28px;
}

.sideBarProfileSection {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

p {
	font-size: 16px;
	cursor: pointer;
}
</style>

<template>
	<div class="sideBarContainer">
		<section class="sideBarHeader">
			<p>{{ username }}님, 안녕하세요!</p>
		</section>
		<section class="sideBarProfileSection">
			<img
				src=""
				alt="profile-image"
				:style="{ backgroundColor: COLORS.GRAY01 }"
			/>
			<div class="sideBarButtons">
				<p @click="goToMypage">마이페이지</p>
				<p @click="goToHome">로그아웃</p>
			</div>
		</section>
	</div>
</template>

<script setup>
import { COLORS } from "@/util/constants";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goToMypage = () => {
	router.push({ name: "Mypage" });
};
const goToHome = () => {
	router.push({ name: "Home" });
};

defineProps({
	username: {
		type: String,
		required: true,
	},
});
</script>
