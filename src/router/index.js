import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Mypage from '@/pages/Mypage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: Mypage,
    },
  ],
});

export default router;
