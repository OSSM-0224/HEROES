import api from './axios.js';

export const reportsApi = {
  getOverview: (params) => api.get('/reports/overview', { params }),
  getStatusDistribution: (params) => api.get('/reports/status', { params }),
  getSourceAnalytics: (params) => api.get('/reports/source', { params }),
  getTrend: (params) => api.get('/reports/trend', { params }),
  getPriorityDistribution: (params) => api.get('/reports/priority', { params }),
  getUserPerformance: (params) => api.get('/reports/performance', { params }),
  getRecentActivity: (params) => api.get('/reports/activity', { params }),
  exportCsv: (params) => api.get('/reports/export/csv', { params, responseType: 'blob' }),
};
