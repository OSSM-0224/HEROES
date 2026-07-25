import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../services/auth.service.jsx';
import { Navbar } from '../../components/common/Navbar.jsx';
import { Footer } from '../../components/common/Footer.jsx';
import { Input } from '../../components/common/Input.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await register({ name, email, password, role });
      if (res.success) {
        toast.success('Account created successfully!');
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <Card className="w-full max-w-md shadow-xl border-slate-200 bg-white">
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl mx-auto shadow-md shadow-indigo-500/25">
              H
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
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs font-medium">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="MEMBER">Member (Sales Exec / Rep)</SelectItem>
                    <SelectItem value="ADMIN">Admin (Team Lead / Manager)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" loading={loading} className="w-full py-2.5 text-sm mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20">
                Create Workspace Account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pt-0">
            <p className="text-center text-xs text-slate-500 font-medium">
              Already registered?{' '}
              <Link to="/login" className="font-bold text-indigo-600 hover:underline">
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
