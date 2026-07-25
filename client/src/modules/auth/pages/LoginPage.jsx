import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin.js';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { Footer } from '../../../components/common/Footer.jsx';
import { Input } from '../../../components/common/Input.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Shield, Users } from 'lucide-react';

export const LoginPage = () => {
  const { email, password, error, loading, setEmail, setPassword, handleSubmit, handleQuickFill } = useLogin();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <Card className="w-full max-w-md shadow-xl border-slate-200 bg-white">
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl mx-auto shadow-md shadow-indigo-500/25">
              H
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

              <Button type="submit" loading={loading} className="w-full py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20">
                Sign In
              </Button>
            </form>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-slate-900">Quick 1-Click Demo Login:</p>
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Preset Auth</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold justify-start h-9 px-3 bg-white border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 gap-1.5"
                  onClick={() => handleQuickFill('ADMIN')}
                >
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                  Admin Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold justify-start h-9 px-3 bg-white border-slate-200 hover:bg-slate-100 text-slate-700 gap-1.5"
                  onClick={() => handleQuickFill('MEMBER')}
                >
                  <Users className="w-3.5 h-3.5 text-slate-600" />
                  Rep Demo
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-center pt-0">
            <p className="text-center text-xs text-slate-500 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-indigo-600 hover:underline">
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
