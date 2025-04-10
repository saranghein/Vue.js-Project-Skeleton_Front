import axios from 'axios';
import { API_URL } from '@/util/constants.js';

const ApiService = {
  /**
   * GET 요청을 실행하여 쿼리 파라미터를 전달합니다.
   * @param {string} resource - 요청할 API 리소스 경로 (예: 'money')
   * @param {object} params - Axios config 객체로, 주로 params: { key: value } 형태의 쿼리 파라미터
   * @returns {Promise<AxiosResnpx json-server --watch db.json --port 5173ponse>} - Axios 응답 Promise
   */
  query(resource, params) {
    return axios.get(`${API_URL}${resource}`, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  /**
   * GET 요청을 실행합니다.
   * @param {string} resource - 기본 리소스 경로 (예: 'money')
   * @param {string} [slug=''] - 세부 리소스 ID 또는 경로 (예: '123' → 'money/123')
   * @returns {Promise<AxiosResponse>} - Axios 응답 Promise
   */
  get(resource, slug = '') {
    return axios.get(`${API_URL}${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  /**
   * POST 요청을 실행합니다.
   * @param {string} resource - 요청할 API 리소스 경로
   * @param {object} params - 요청 본문에 포함될 데이터 (예: { name: 'Test' })
   * @returns {Promise<AxiosResponse>} - Axios 응답 Promise
   */
  post(resource, params) {
    return axios.post(`${API_URL}${resource}`, params);
  },

  /**
   * PUT 요청 (리소스 ID 포함)을 실행합니다.
   * @param {string} resource - 리소스 경로
   * @param {string} slug - 리소스 식별자 (예: '123')
   * @param {object} params - 업데이트할 데이터
   * @returns {Promise<AxiosResponse>} - Axios 응답 Promise
   */
  update(resource, slug, params) {
    return axios.put(`${API_URL}${resource}/${slug}`, params);
  },

  /**
   * PUT 요청 (리소스 ID 없이)을 실행합니다.
   * @param {string} resource - 리소스 경로
   * @param {object} params - 업데이트할 데이터
   * @returns {Promise<AxiosResponse>} - Axios 응답 Promise
   */
  put(resource, params) {
    return axios.put(`${API_URL}${resource}`, params);
  },

  /**
   * DELETE 요청을 실행합니다.
   * @param {string} resource - 삭제할 리소스 경로 또는 ID 포함 경로
   * @returns {Promise<AxiosResponse>} - Axios 응답 Promise
   */
  delete(resource) {
    return axios.delete(`${API_URL}${resource}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
};

export default ApiService;

/**
 * 거래 내역 관련 API 서비스
 */
export const TransactionService = {
  /**
   * 거래 내역 전체를 조회합니다.
   * @returns {Promise<AxiosResponse>} - 거래 데이터 리스트 반환
   */
  get() {
    return ApiService.get('money');
  },

  delete(id) {
    return ApiService.delete(`money/${id}`);
  },
};

export const UsersService = {
  /**
   * 특정 유저 정보를 조회합니다.
   * @param {number|string} id - 조회할 유저의 ID
   * @returns {Promise<AxiosResponse>} - 유저 데이터 반환
   */
  get(id) {
    return ApiService.get('users', id);
  },
  put(id, changedData) {
    return ApiService.put(`users/${id}`, {
      id: id,
      profileImg: changedData.profileImg,
      birth: changedData.birth,
      phone: changedData.phone,
      email: changedData.email,
      user_id: changedData.user_id,
      user_pw: changedData.user_pw,
    });
  },
};
