import React from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister.js';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { Footer } from '../../../components/common/Footer.jsx';
import { Input } from '../../../components/common/Input.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, UserPlus } from 'lucide-react';

export const RegisterPage = () => {
  const { name, email, password, role, error, loading, setName, setEmail, setPassword, setRole, handleSubmit } = useRegister();

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
            <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Create HEROES Account</CardTitle>
            <CardDescription className="text-xs text-slate-500 font-medium">
              Join your team's Lead Management workspace
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
                label="Email Address"
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
                <Label className="text-xs font-bold text-slate-700">Account Role</Label>
                <Select value={role} onValueChange={(val) => setRole(val)}>
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs font-medium focus:ring-emerald-500">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="MEMBER">Member (Sales Exec / Rep)</SelectItem>
                    <SelectItem value="ADMIN">Admin (Team Lead / Manager)</SelectItem>
                  </SelectContent>
                </Select>
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