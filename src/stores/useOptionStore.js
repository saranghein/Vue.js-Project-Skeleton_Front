import { defineStore } from 'pinia';
import axios from 'axios';
import { API_URL } from '@/util/constants';

export const useOptionStore = defineStore('option', {
  state: () => ({
    categories: [],
    paymentMethods: [],
  }),
  actions: {
    async fetchOptions() {
      try {
        const [catRes, payRes] = await Promise.all([
          // axios.get('http://localhost:3000/categories'),
          // axios.get('http://localhost:3000/paymentMethods'),
          axios.get(`${API_URL}categories`),
          axios.get(`${API_URL}paymentMethods`),
        ]);
        this.categories = catRes.data;
        this.paymentMethods = payRes.data;
      } catch (error) {
        console.error('옵션 불러오기 실패:', error);
      }
    },
  },
});
