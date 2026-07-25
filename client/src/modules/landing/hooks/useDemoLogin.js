import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/services/auth.service.js';

export const useDemoLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = useCallback(async (roleType) => {
    try {
      const email = roleType === 'ADMIN' ? 'admin@heroes.com' : 'sarah@heroes.com';
      await login({ email, password: 'password123' });
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  }, [login, navigate]);

  return { handleDemoLogin };
};
