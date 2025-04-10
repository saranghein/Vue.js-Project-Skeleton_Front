import { defineStore } from 'pinia';
import axios from 'axios';
import { UsersService } from '@/util/apiService';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await UsersService.get();
        this.users = response.data;
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    },
    async updateUser(userId, updatedData) {
      try {
        const response = await UsersService.put(
          `/users/${userId}`,
          updatedData
        );
        console.log('유저 정보 업데이트 성공:', response.data);
        return response.data; // 성공한 데이터 반환
      } catch (error) {
        console.error('유저 정보 업데이트 실패:', error);
        throw error; // 에러를 호출한 곳으로 전달
      }
    },
  },
});
