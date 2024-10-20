import axios from 'axios';

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL, // 从环境变量中获取 API 基础 URL
  timeout: 5000, // 请求超时设置
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 你可以在这里添加 token 等通用的请求逻辑
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;