import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin.js';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { Footer } from '../../../components/common/Footer.jsx';
import { Input } from '../../../components/common/Input.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Shield, Users, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { email, password, error, loading, setEmail, setPassword, handleSubmit, handleQuickFill } = useLogin();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-16 relative overflow-hidden">
        {/* Ambient background accent */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-emerald-100/60 blur-3xl" />
        </div>

        <Card className="w-full max-w-md shadow-xl shadow-slate-900/5 border-slate-200 bg-white">
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto">
              <img src="/HEROES_LOGO.svg" alt="HEROES" className="w-full h-full drop-shadow-md" />
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Sign in to HEROES</CardTitle>
            <CardDescription className="text-xs text-slate-500 font-medium">
              Enter your credentials to access your CRM workspace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="py-2.5">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@heroes.com"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full py-2.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/25 transition-colors"
              >
                Sign In
              </Button>
            </form>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Quick 1-Click Demo Login
                </p>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 font-bold uppercase tracking-wider">
                  Preset Auth
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-center pt-0">
            <p className="text-center text-xs text-slate-500 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-2">
                Create account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};