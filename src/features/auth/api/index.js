import api from '../../../core/api/client';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const logout = () => {
  return api.post('/auth/logout');
};
