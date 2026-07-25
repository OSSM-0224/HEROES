import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../services/auth.service.jsx';
import { Spinner } from '../common/Spinner.jsx';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" />
      <p className="text-xs font-medium text-slate-400">Verifying access…</p>
    </div>
  </div>
);

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            You need the <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">{requiredRole}</span> role to access this module.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const AuthGuard = ProtectedRoute;