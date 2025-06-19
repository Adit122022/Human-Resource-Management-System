import axios from 'axios';
import useAuthStore from '../store/authStore';

const axiosinstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Proxied to http://localhost:5000
  headers: { 'Content-Type': 'application/json' },
});

axiosinstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosinstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default axiosinstance;