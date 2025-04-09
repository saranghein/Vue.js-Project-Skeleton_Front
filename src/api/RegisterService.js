import ApiService from '@/util/apiService';

export const RegisterService = {
  /**
   * 거래 등록
   * @param {object} payload - 등록할 거래 데이터
   * @returns {Promise<AxiosResponse>}
   */
  create(payload) {
    return ApiService.post('money', payload);
  },

  /**
   * 거래 수정 (PUT)
   * @param {string} id - 거래 ID
   * @param {object} payload - 수정할 데이터
   * @returns {Promise<AxiosResponse>}
   */
  update(id, payload) {
    return ApiService.update('money', id, payload);
  },
};
