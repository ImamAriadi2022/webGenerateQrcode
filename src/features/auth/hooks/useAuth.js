import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, logout as logoutApi } from '../api';
import { getAreas } from '../../qr-generator/api';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const userDataStr = localStorage.getItem('user');
    return userDataStr ? JSON.parse(userDataStr) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await loginApi(email, password);
      if (response.data.success) {
        const { token, user: loggedInUser } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);

        try {
          const areasResponse = await getAreas();
          if (areasResponse.data?.data) {
            localStorage.setItem('adminAreas', JSON.stringify(areasResponse.data.data));
            if (loggedInUser.managedAreaId) {
              localStorage.setItem('selectedAreaId', loggedInUser.managedAreaId);
            } else if (areasResponse.data.data.length > 0) {
              localStorage.setItem('selectedAreaId', areasResponse.data.data[0].id);
            }
          }
        } catch (areaErr) {
          console.warn('Gagal fetch areas:', areaErr);
        }
        navigate('/');
        return true;
      } else {
        setError(response.data.message || 'Login gagal');
        return false;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminAreas');
      localStorage.removeItem('selectedAreaId');
      setUser(null);
      navigate('/login');
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout
  };
};
