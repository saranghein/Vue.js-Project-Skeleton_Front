import { defineStore } from 'pinia';
import axios from 'axios';

export const useOptionStore = defineStore('option', {
  state: () => ({
    categories: [],
    paymentMethods: [],
  }),
  actions: {
    async fetchOptions() {
      try {
        const [catRes, payRes] = await Promise.all([
          axios.get('http://localhost:3000/categories'),
          axios.get('http://localhost:3000/paymentMethods'),
        ]);
        this.categories = catRes.data;
        this.paymentMethods = payRes.data;
      } catch (error) {
        console.error('옵션 불러오기 실패:', error);
      }
    },
  },
});
