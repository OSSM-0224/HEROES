import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './services/auth.service.jsx';
import { ThemeProvider } from './services/theme.service.jsx';
import { ProtectedRoute, GuestRoute } from './components/auth/AuthGuard.jsx';
import { LandingPage } from './modules/landing/pages/LandingPage.jsx';
import { LoginPage } from './modules/auth/pages/LoginPage.jsx';
import { RegisterPage } from './modules/auth/pages/RegisterPage.jsx';
import { DashboardLayout } from './modules/dashboard/pages/DashboardLayout.jsx';
import { PublicCapturePage } from './modules/dashboard/pages/PublicCapturePage.jsx';
import ReportsPage from './modules/reports/pages/ReportsPage.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" richColors expand closeButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/capture" element={<PublicCapturePage />} />

            <Route
              path="/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <RegisterPage />
                </GuestRoute>
              }
            />

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

