import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../services/auth.service.js';
import { DEMO_CREDENTIALS } from '../utils/constants.js';

export const useLogin = () => {
  const [email, setEmail] = useState('admin@heroes.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        toast.success('Login Successful!');
        navigate(from, { replace: true });
      } else {
        const msg = res.message || 'Login failed';
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err.message || 'Invalid email or password';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (roleType) => {
    const creds = DEMO_CREDENTIALS[roleType];
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
    }
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    handleQuickFill,
  };
};
