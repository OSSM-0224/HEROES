import React from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister.js';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { Footer } from '../../../components/common/Footer.jsx';
import { Input } from '../../../components/common/Input.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, UserPlus, Building2 } from 'lucide-react';

export const RegisterPage = () => {
  const { name, email, password, organizationName, error, loading, setName, setEmail, setPassword, setOrganizationName, handleSubmit } = useRegister();

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
            <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Create Your HEROES Workspace</CardTitle>
            <CardDescription className="text-xs text-slate-500 font-medium">
              Each workspace is fully isolated — your company's leads, members, and reports stay private.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="py-2.5">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />

              <Input
                label="Work Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  <label className="text-xs font-bold text-slate-700">Company / Workspace Name</label>
                  <span className="text-[10px] font-medium text-slate-400">(optional)</span>
                </div>
                <Input
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Acme Industries"
                />
                <p className="text-[11px] text-slate-400 font-medium">
                  You'll be the ADMIN of this workspace. You can manage members and roles from the dashboard.
                </p>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full py-2.5 text-sm mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/25 gap-1.5 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Create Workspace Account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pt-0">
            <p className="text-center text-xs text-slate-500 font-medium">
              Already registered?{' '}
              <Link to="/login" className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-2">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
