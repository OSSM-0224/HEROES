import { useState } from 'react';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'New',
  priority: 'Medium',
  value: 5000,
  assignedTo: '',
};

export const useCreateLeadForm = (onSubmit, onClose) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        assignedTo: formData.assignedTo || null,
      };
      await onSubmit(payload);
      onClose();
      setFormData(INITIAL_FORM);
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, handleChange, handleSubmit, resetForm: () => setFormData(INITIAL_FORM) };
};
