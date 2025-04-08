import { createRouter, createWebHistory } from 'vue-router';
import Registration from '@/pages/Registration.vue';
import Mypage from '@/pages/Mypage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Registration',
      component: Registration,
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: Mypage,
    },
  ],
});

export default router;
