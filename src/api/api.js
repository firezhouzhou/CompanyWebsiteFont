import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';

/* ============================================
   Axios Instance Configuration
   ============================================ */

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:9080/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Request Interceptor - Attach JWT Token */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Response Interceptor - Handle errors */
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          removeToken();
          window.location.href = '/login';
          break;
        case 403:
          console.error('权限不足');
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error('请求失败:', error.response.data?.message || '未知错误');
      }
    } else if (error.request) {
      console.error('网络错误，请检查您的网络连接');
    }
    return Promise.reject(error);
  }
);

/* ============================================
   Home API
   ============================================ */

export const getCompanyInfo = () => {
  return api.get('/company/info');
};

export const getLatestNews = (params) => {
  return api.get('/news/latest', { params });
};

/* ============================================
   Products API
   ============================================ */

export const getProducts = (params) => {
  return api.get('/products', { params });
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const getProductsByCategory = (category, params) => {
  return api.get(`/products/category/${category}`, { params });
};

/* ============================================
   Solutions API
   ============================================ */

export const getSolutions = (params) => {
  return api.get('/solutions', { params });
};

export const getSolutionById = (id) => {
  return api.get(`/solutions/${id}`);
};

export const getSolutionsByIndustry = (industry, params) => {
  return api.get(`/solutions/industry/${industry}`, { params });
};

/* ============================================
   About API
   ============================================ */

export const getTeamMembers = () => {
  return api.get('/about/team');
};

/* ============================================
   Contact API
   ============================================ */

export const submitContact = (data) => {
  return api.post('/contact', data);
};

/* ============================================
   User / Auth API
   ============================================ */

export const login = (credentials) => {
  return api.post('/user/login', credentials);
};

export const register = (userData) => {
  return api.post('/user/register', userData);
};

export const getCurrentUser = () => {
  return api.get('/user/current');
};

/* ============================================
   Search API
   ============================================ */

export const search = (keyword, params) => {
  return api.get('/search', { params: { keyword, ...params } });
};

/* ============================================
   Site Config API
   ============================================ */

export const getFooterConfig = () => {
  return api.get('/site-config/footer');
};

/* ============================================
   Statistics API
   ============================================ */

export const getDailyStats = () => {
  return api.get('/statistics/daily');
};

export const getStatsRange = (startDate, endDate) => {
  return api.get('/statistics/range', { params: { startDate, endDate } });
};

export default api;
