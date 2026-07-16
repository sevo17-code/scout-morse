// src/api/endpoints.js
import api from './axiosConfig.js';

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const examApi = {
  start: () => api.post('/exam/start'),
  submit: (answers) => api.post('/exam/submit', { answers }),
  leaderboard: () => api.get('/exam/leaderboard'),
  history: () => api.get('/exam/history'),
};

export const questionsApi = {
  getAll: () => api.get('/questions'),
  create: (data) => api.post('/questions', data),
  update: (id, data) => api.patch(`/questions/${id}`, data),
  remove: (id) => api.delete(`/questions/${id}`),
};

export const adminApi = {
  users: () => api.get('/admin/users'),
  stats: () => api.get('/admin/stats'),
};
