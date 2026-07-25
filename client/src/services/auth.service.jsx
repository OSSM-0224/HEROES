import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth.api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('heroes_token');
    const hasCookieToken = document.cookie.includes('token=');

    if (!token && !hasCookieToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await authApi.getMe();
      if (res.success && res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
      localStorage.removeItem('heroes_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    if (res.success && res.data) {
      setUser(res.data.user);
      if (res.data.token) {
        localStorage.setItem('heroes_token', res.data.token);
      }
    }
    return res;
  };

  const register = async (userData) => {
    const res = await authApi.register(userData);
    if (res.success && res.data) {
      setUser(res.data.user);
      if (res.data.token) {
        localStorage.setItem('heroes_token', res.data.token);
      }
    }
    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore
    } finally {
      setUser(null);
      localStorage.removeItem('heroes_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
