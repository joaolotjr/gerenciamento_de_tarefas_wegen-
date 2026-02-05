import axios from 'axios';

const api = axios.create({
  // Verifique se a porta da sua API é 5055 ou outra
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para adicionar o token JWT em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;