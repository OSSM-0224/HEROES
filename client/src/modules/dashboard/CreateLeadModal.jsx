import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { STATUS_COLORS, PRIORITY_COLORS, LEAD_STATUSES, LEAD_PRIORITIES } from '../../utils/constants.js';

export const CreateLeadModal = ({ isOpen, onClose, onSubmit, users = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'New',
    priority: 'Medium',
    value: 5000,
    assignedTo: '',
  });

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
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'New',
        priority: 'Medium',
        value: 5000,
        assignedTo: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-slate-200 text-slate-900 p-6 space-y-4 rounded-3xl">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 font-heading">
            Create New Lead
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium">
            Fill in details to add a prospect directly to your CRM pipeline.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Full Name *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jordan Smith"
              required
              className="text-xs bg-slate-50 border-slate-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Address *</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jordan@company.com"
              required
              className="text-xs bg-slate-50 border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-1122"
                className="text-xs bg-slate-50 border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Company</label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="text-xs bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Status</label>
              <Select value={formData.status} onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {LEAD_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Priority</label>
              <Select value={formData.priority} onValueChange={(val) => setFormData((prev) => ({ ...prev, priority: val }))}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {LEAD_PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Estimated Value ($)</label>
              <Input
                name="value"
                type="number"
                value={formData.value}
                onChange={handleChange}
                placeholder="5000"
                className="text-xs bg-slate-50 border-slate-200 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Assign Rep</label>
              <Select value={formData.assignedTo} onValueChange={(val) => setFormData((prev) => ({ ...prev, assignedTo: val }))}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select Rep" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="">Unassigned</SelectItem>
                  {users.map((u) => (
                    <SelectItem key={u._id || u.id} value={u._id || u.id}>{u.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="text-xs font-bold border-slate-200">
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
