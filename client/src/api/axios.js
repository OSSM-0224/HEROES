import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization header if token exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('heroes_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

    if (!error.response) {
      toast.error('Network Error: Please check your connection');
    } else if (status === 401) {
      toast.error('Unauthorized Access: Please log in to continue');
    } else if (status === 403) {
      toast.warning('Forbidden Action: You do not have permission for this request');
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
