import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../services/auth.service.js';

export const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await register({
        name,
        email,
        password,
        organizationName: organizationName.trim() || undefined,
      });
      if (res.success) {
        toast.success('Workspace created successfully!');
        navigate('/dashboard');
      } else {
        const msg = res.message || 'Registration failed';
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err.message || 'Error creating account';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    organizationName,
    error,
    loading,
    setName,
    setEmail,
    setPassword,
    setOrganizationName,
    handleSubmit,
  };
};
