import { useState } from 'react';
import { toast } from 'sonner';
import { leadsApi } from '../api/leads.api.js';

const INITIAL_FORM = { name: '', email: '', phone: '', company: '' };

export const usePublicCaptureForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
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

  const resetForm = () => {
    setSubmitted(false);
    setFormData(INITIAL_FORM);
  };

  return { formData, submitted, loading, error, handleChange, handleSubmit, resetForm };
};
