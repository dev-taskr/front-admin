import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.taskr.cl',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Solicitudes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // O donde guardes el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo de errores globales
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.data || 'An error occurred');
    return Promise.reject(error);
  }
);

export default axiosInstance;
