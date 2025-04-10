import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Registration from '@/pages/Registration.vue';
import Mypage from '@/pages/Mypage.vue';
import TransactionHistory from '@/pages/TransactionHistory.vue';
import MypageEdit from '@/pages/MypageEdit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/register',
      name: 'Registration',
      component: Registration,
    },
    {
      path: '/mypage/:id',
      name: 'Mypage',
      component: Mypage,
      props: true,
    },
    {
      path: '/mypage-edit/:id',
      name: 'MypageEdit',
      component: MypageEdit,
      props: true,
    },
    {
      path: '/transaction-history',
      name: 'TransactionHistory',
      component: TransactionHistory,
    },
  ],
});

export default router;
