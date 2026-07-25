import api from './axios.js';

export const usersApi = {
  getUsers: () => api.get('/users'),
  updateRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }),
};
