import React, { useState } from 'react';
import { toast } from 'sonner';
import { Navbar } from '../../components/common/Navbar.jsx';
import { Footer } from '../../components/common/Footer.jsx';
import { Input } from '../../components/common/Input.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { leadsApi } from '../../api/leads.api.js';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export const PublicCapturePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await leadsApi.submitPublicLead(formData);
      if (res.success) {
        setSubmitted(true);
        toast.success('Lead submitted successfully!');
      } else {
        const msg = res.message || 'Submission failed';
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err.message || 'Error submitting lead';
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
        <Card className="w-full max-w-lg shadow-xl border-slate-200 bg-white">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <Badge variant="outline" className="gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border-indigo-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Public Inbound Lead Form
              </Badge>
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">Request HEROES Consultation</CardTitle>
            <CardDescription className="text-xs text-slate-500 font-medium">
              Fill in your details below. This will automatically flow into the HEROES CRM pipeline as a "Public Form" lead.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h2 className="text-lg font-bold text-emerald-900">Lead Captured Successfully!</h2>
                <p className="text-xs text-emerald-700">
                  Your request has been registered. Check the HEROES Dashboard to view this lead in real time!
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', company: '' });
                  }}
                  variant="outline"
                  size="sm"
                  className="font-bold border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                >
                  Submit Another Lead
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="py-2.5">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                  </Alert>
                )}

                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Mercer"
                  required
                />

                <Input
                  label="Work Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@acme.com"
                  required
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-1122"
                />

                <Input
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Innovations"
                />

                <Button type="submit" loading={loading} className="w-full py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20">
                  Submit Consultation Request
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
