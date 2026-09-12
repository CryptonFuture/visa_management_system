import axios from 'axios';

const api = axios.create({
  baseURL: "https://visabackend-phi.vercel.app/api",
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('visa_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('visa_token');
      localStorage.removeItem('visa_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
