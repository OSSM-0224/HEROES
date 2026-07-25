import api from './axios.js';

export const leadsApi = {
  getLeads: (params) => api.get('/leads', { params }),
  getMetrics: () => api.get('/leads/metrics'),
  getLeadById: (id) => api.get(`/leads/${id}`),
  createLead: (data) => api.post('/leads', data),
  submitPublicLead: (data) => api.post('/leads/public', data),
  updateLead: (id, data) => api.put(`/leads/${id}`, data),
  deleteLead: (id) => api.delete(`/leads/${id}`),
  addNote: (id, text) => api.post(`/leads/${id}/notes`, { text }),
};
