import { defineStore } from 'pinia';
import { UsersService } from '@/util/apiService';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers(userId) {
      try {
        const response = await UsersService.get(userId);
        console.log('유저 정보 가져오기 성공: ', response.data);
        return response.data;
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
        throw error;
      }
    },
    async updateUser(userId, updatedData) {
      try {
        const response = await UsersService.put(
          `/users/${userId}`,
          updatedData
        );
        console.log('유저 정보 업데이트 성공:', response.data);
        return response.data;
      } catch (error) {
        console.error('유저 정보 업데이트 실패:', error);
        throw error;
      }
    },
  },
});
