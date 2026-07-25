export const APP_NAME = 'HEROES';

export const STATUS_COLORS = {
  New: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Contacted: 'bg-teal-50 text-teal-700 border-teal-200',
  Qualified: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'Proposal Sent': 'bg-amber-50 text-amber-700 border-amber-200',
  'Closed Won': 'bg-emerald-600 text-white border-emerald-700',
  'Closed Lost': 'bg-rose-50 text-rose-700 border-rose-200',
};

export const PRIORITY_COLORS = {
  Low: 'bg-slate-100 text-slate-700 border-slate-200',
  Medium: 'bg-teal-50 text-teal-700 border-teal-200',
  High: 'bg-amber-50 text-amber-700 border-amber-200',
  Urgent: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Closed Won',
  'Closed Lost',
];

export const LEAD_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

export const LEAD_SOURCES = [
  'Website',
  'Referral',
  'Inbound Call',
  'Cold Outreach',
  'Event',
  'Public Form',
  'Other',
];
