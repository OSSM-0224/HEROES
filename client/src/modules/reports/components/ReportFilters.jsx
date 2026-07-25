import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Printer } from 'lucide-react';

const RANGE_PRESETS = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'This Year', value: 'year' },
  { label: 'All Time', value: 'all' },
];

const STATUSES = ['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost'];
const PRIORITIES = ['All', 'Low', 'Medium', 'High', 'Urgent'];

export function ReportFilters({ range, onRangeChange, status, onStatusChange, priority, onPriorityChange, onExportCsv, onPrint }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
        <Calendar className="w-4 h-4 text-slate-400 ml-1.5" />
        {RANGE_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onRangeChange(preset.value)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              range === preset.value
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[140px] h-9 text-xs">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s} className="text-xs">{s === 'All' ? 'All Statuses' : s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[140px] h-9 text-xs">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {PRIORITIES.map((p) => (
            <SelectItem key={p} value={p} className="text-xs">{p === 'All' ? 'All Priorities' : p}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2 ml-auto">
        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5" onClick={onExportCsv}>
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </Button>
        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5" onClick={onPrint}>
          <Printer className="w-3.5 h-3.5" />
          Print
        </Button>
      </div>
    </div>
  );
}
