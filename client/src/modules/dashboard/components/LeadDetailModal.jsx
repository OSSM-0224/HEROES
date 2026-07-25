import React from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SlaCountdownChip } from '@/components/common/SlaCountdownChip.jsx';
import { useLeadDetail } from '../hooks/useLeadDetail.js';
import { STATUS_COLORS, PRIORITY_COLORS, LEAD_STATUSES, LEAD_PRIORITIES } from '../utils/constants.js';
import { Clock, User, Mail, Phone, Building, Trash2, Send, History, DollarSign, MessageSquare } from 'lucide-react';

export const LeadDetailModal = ({ isOpen, onClose, lead, onUpdate, onDelete, onAddNote, users = [] }) => {
  const { currentUser, newNote, setNewNote, submittingNote, handleNoteSubmit, isAdmin } = useLeadDetail();

  if (!lead) return null;

  const logs = lead.activityLog || lead.activities || [];
  const notesList = lead.notes || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border-slate-200 text-slate-900 max-h-[90vh] overflow-y-auto p-6 space-y-6 rounded-3xl">
        <DialogHeader className="space-y-2 text-left border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge className={STATUS_COLORS[lead.status] || ''}>{lead.status}</Badge>
              <Badge className={PRIORITY_COLORS[lead.priority] || ''}>{lead.priority}</Badge>
            </div>
            <SlaCountdownChip createdAt={lead.createdAt} />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 font-heading">{lead.name}</DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium">
            Lead ID: {lead._id || lead.id} • Source: {lead.source || 'Inbound'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Email Address</div>
              <div className="text-xs font-bold text-slate-800">{lead.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Phone</div>
              <div className="text-xs font-bold text-slate-800 font-mono">{lead.phone || 'N/A'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Company</div>
              <div className="text-xs font-bold text-slate-800">{lead.company || 'N/A'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Estimated Value</div>
              <div className="text-sm font-black text-emerald-700 font-mono">${lead.value?.toLocaleString() || 0}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Stage Status</label>
            <Select value={lead.status} onValueChange={(val) => onUpdate(lead._id || lead.id, { status: val })}>
              <SelectTrigger className="h-9 text-xs bg-white border-slate-200 font-medium"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {LEAD_STATUSES.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Priority Level</label>
            <Select value={lead.priority} onValueChange={(val) => onUpdate(lead._id || lead.id, { priority: val })}>
              <SelectTrigger className="h-9 text-xs bg-white border-slate-200 font-medium"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {LEAD_PRIORITIES.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Assigned Representative</label>
            <Select value={lead.assignedTo?._id || lead.assignedTo?.id || 'UNASSIGNED'}
              onValueChange={(val) => onUpdate(lead._id || lead.id, { assignedTo: val === 'UNASSIGNED' ? null : val })}>
              <SelectTrigger className="h-9 text-xs bg-white border-slate-200 font-medium"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
                {users.map((u) => (<SelectItem key={u._id || u.id} value={u._id || u.id}>{u.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-heading">
            <Send className="w-3.5 h-3.5 text-emerald-600" />Add Sales Note
          </label>
          <form onSubmit={(e) => handleNoteSubmit(e, lead._id || lead.id, onAddNote)} className="space-y-2">
            <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter note or meeting interaction details..."
              className="text-xs min-h-[80px] bg-slate-50 border-slate-200 focus:bg-white" />
            <div className="flex justify-end">
              <Button type="submit" size="sm" loading={submittingNote} disabled={!newNote.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5">
                <Send className="w-3.5 h-3.5" />Post Note
              </Button>
            </div>
          </form>
        </div>

        {notesList.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-heading">
              <MessageSquare className="w-4 h-4 text-emerald-600" />Sales Notes ({notesList.length})
            </h4>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {notesList.map((n, i) => (
                <div key={i} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500 font-medium text-[10px]">
                    <span className="font-bold text-emerald-800">{n.createdByName || n.user?.name || 'Rep'}</span>
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-800 font-medium">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-heading">
            <History className="w-4 h-4 text-emerald-600" />Immutable Activity Audit Log ({logs.length})
          </h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            {logs.length > 0 ? logs.map((act, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 font-medium text-[10px]">
                  <span className="font-bold text-emerald-700">{act.performedByName || act.user?.name || 'System'}</span>
                  <span>{new Date(act.createdAt || act.timestamp || Date.now()).toLocaleString()}</span>
                </div>
                <p className="text-slate-800 font-medium">{act.description || act.text}</p>
              </div>
            )) : (
              <div className="text-center py-6 text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No activity logs recorded yet.
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between pt-4 border-t border-slate-100">
          {isAdmin ? (
            <Button variant="ghost" size="sm" onClick={() => { if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) onDelete(lead._id || lead.id); }}
              className="text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 gap-1.5">
              <Trash2 className="w-3.5 h-3.5" />Delete Lead (Admin Only)
            </Button>
          ) : (
            <span className="text-[11px] text-slate-400 font-medium">Delete action restricted to Admins</span>
          )}
          <Button variant="outline" size="sm" onClick={onClose} className="font-bold text-xs border-slate-200">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
