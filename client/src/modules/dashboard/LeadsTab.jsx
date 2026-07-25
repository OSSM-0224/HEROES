import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, LayoutGrid, Table as TableIcon, Filter, RefreshCw, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SlaCountdownChip } from '@/components/common/SlaCountdownChip.jsx';
import { STATUS_COLORS, PRIORITY_COLORS, LEAD_STATUSES, LEAD_PRIORITIES } from '../../utils/constants.js';

export const LeadsTab = ({
  leads = [],
  pagination,
  filters,
  onFilterChange,
  onOpenCreateModal,
  onSelectLead,
  users = [],
}) => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'

  const totalPages = pagination?.totalPages || pagination?.pages || 1;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search & Actions Bar */}
      <Card className="p-4 border-slate-200 bg-white shadow-2xs rounded-2xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search leads by name, email, company..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10 text-xs bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>

          {/* Filters and View mode toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status filter */}
            <Select value={filters.status} onValueChange={(val) => onFilterChange({ status: val })}>
              <SelectTrigger className="w-[130px] h-9 text-xs bg-slate-50 border-slate-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="ALL">All Statuses</SelectItem>
                {LEAD_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Priority filter */}
            <Select value={filters.priority} onValueChange={(val) => onFilterChange({ priority: val })}>
              <SelectTrigger className="w-[130px] h-9 text-xs bg-slate-50 border-slate-200">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="ALL">All Priorities</SelectItem>
                {LEAD_PRIORITIES.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Assignee filter */}
            <Select value={filters.assignedTo} onValueChange={(val) => onFilterChange({ assignedTo: val })}>
              <SelectTrigger className="w-[150px] h-9 text-xs bg-slate-50 border-slate-200">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="ALL">All Assignees</SelectItem>
                <SelectItem value="UNASSIGNED">Unassigned Only</SelectItem>
                {users.map((u) => (
                  <SelectItem key={u._id || u.id} value={u._id || u.id}>{u.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear filters button if active */}
            {(filters.search || filters.status !== 'ALL' || filters.priority !== 'ALL' || filters.assignedTo !== 'ALL') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange({ search: '', status: 'ALL', priority: 'ALL', assignedTo: 'ALL', page: 1 })}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50"
              >
                Reset Filters
              </Button>
            )}

            {/* View toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'kanban'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Kanban Board View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <Button onClick={onOpenCreateModal} className="gap-1.5 shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
              <Plus className="w-4 h-4" />
              Add Lead
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content View */}
      {viewMode === 'table' ? (
        <Card className="overflow-hidden border-slate-200 bg-white shadow-2xs rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 border-b border-slate-200">
                <TableHead className="text-slate-700 font-bold text-xs">Lead Name & Company</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">Contact</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">Status</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">24h SLA Timer</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">Priority</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">Deal Value</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">Assigned Rep</TableHead>
                <TableHead className="text-right text-slate-700 font-bold text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <TableRow
                    key={lead._id || lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="hover:bg-emerald-50/30 cursor-pointer border-b border-slate-100 transition-colors"
                  >
                    <TableCell>
                      <div className="font-bold text-slate-900 text-sm font-heading">{lead.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{lead.company || 'N/A'}</div>
                    </TableCell>

                    <TableCell>
                      <div className="text-slate-800 font-medium text-xs">{lead.email}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{lead.phone || 'No Phone'}</div>
                    </TableCell>

                    <TableCell>
                      <Badge className={STATUS_COLORS[lead.status] || 'bg-slate-100 text-slate-700'}>
                        {lead.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <SlaCountdownChip createdAt={lead.createdAt} />
                    </TableCell>

                    <TableCell>
                      <Badge className={PRIORITY_COLORS[lead.priority] || 'bg-slate-100 text-slate-700'}>
                        {lead.priority}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-bold text-slate-900 font-mono text-sm">
                      ${lead.value?.toLocaleString() || 0}
                    </TableCell>

                    <TableCell>
                      {lead.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-emerald-600 text-white text-[10px] font-bold">
                              {lead.assignedTo.name?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-slate-800 text-xs">{lead.assignedTo.name}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Unassigned</span>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLead(lead);
                        }}
                        className="text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 font-bold"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-slate-500 space-y-2">
                    <div className="font-bold text-base text-slate-700">No leads match your current filter</div>
                    <p className="text-xs text-slate-400">Try adjusting your search keywords or priority/status dropdowns.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {LEAD_STATUSES.map((status) => {
            const stageLeads = leads.filter((l) => l.status === status);
            return (
              <div key={status} className="bg-slate-100 p-3 rounded-2xl border border-slate-200 space-y-3 min-w-[220px]">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider font-heading">{status}</span>
                  <Badge variant="outline" className="text-[10px] font-mono font-bold bg-white text-slate-700 border-slate-300">
                    {stageLeads.length}
                  </Badge>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {stageLeads.length > 0 ? (
                    stageLeads.map((lead) => (
                      <Card
                        key={lead._id || lead.id}
                        onClick={() => onSelectLead(lead)}
                        className="p-3.5 bg-white border-slate-200 hover:shadow-md cursor-pointer transition-all space-y-2 rounded-2xl"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 font-mono">{lead.company || 'Direct'}</span>
                          <Badge className={`text-[9px] px-1.5 py-0 ${PRIORITY_COLORS[lead.priority] || ''}`}>
                            {lead.priority}
                          </Badge>
                        </div>

                        <div className="font-bold text-slate-900 text-xs line-clamp-1 font-heading">{lead.name}</div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className="font-bold text-slate-900 text-xs font-mono">${lead.value?.toLocaleString() || 0}</span>
                          <SlaCountdownChip createdAt={lead.createdAt} />
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-6 text-[11px] text-slate-400 font-medium border border-dashed border-slate-300 rounded-xl">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl text-xs text-slate-600 font-medium">
          <div>
            Showing page <span className="font-bold text-slate-900">{pagination.page}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span> ({pagination.total} total leads)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => onFilterChange({ page: pagination.page - 1 })}
              className="gap-1 border-slate-200 font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= totalPages}
              onClick={() => onFilterChange({ page: pagination.page + 1 })}
              className="gap-1 border-slate-200 font-bold"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
