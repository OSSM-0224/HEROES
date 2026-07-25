import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Navbar } from '../../components/common/Navbar.jsx';
import { Footer } from '../../components/common/Footer.jsx';
import { OverviewTab } from './OverviewTab.jsx';
import { LeadsTab } from './LeadsTab.jsx';
import { UsersTab } from './UsersTab.jsx';
import { LeadDetailModal } from './LeadDetailModal.jsx';
import { CreateLeadModal } from './CreateLeadModal.jsx';
import { useAuth } from '../../services/auth.service.jsx';
import { leadsApi } from '../../api/leads.api.js';
import { usersApi } from '../../api/users.api.js';
import { LayoutDashboard, Users, ListFilter, Plus, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DashboardLayout = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Leads State
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Users State
  const [users, setUsers] = useState([]);

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    status: 'ALL',
    priority: 'ALL',
    assignedTo: 'ALL',
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    fetchMetrics();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchMetrics = async () => {
    try {
      const res = await leadsApi.getMetrics();
      if (res.success) {
        setMetrics(res.data.metrics);
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await usersApi.getUsers();
      if (res.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await leadsApi.getLeads(filters);
      if (res.success) {
        setLeads(res.data);
        setPagination(res.meta);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      toast.error(err.message || 'Error loading leads');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: newFilters.page || 1 }));
  };

  const handleCreateLead = async (leadData) => {
    try {
      const res = await leadsApi.createLead(leadData);
      if (res.success) {
        toast.success('Lead created successfully');
        fetchLeads();
        fetchMetrics();
        fetchUsers();
      } else {
        toast.error(res.message || 'Failed to create lead');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create lead');
    }
  };

  const handleUpdateLead = async (id, updateData) => {
    try {
      const res = await leadsApi.updateLead(id, updateData);
      if (res.success && res.data?.lead) {
        setSelectedLead(res.data.lead);
        toast.success('Lead updated successfully');
        fetchLeads();
        fetchMetrics();
        fetchUsers();
      } else {
        toast.error(res.message || 'Failed to update lead');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update lead');
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      const res = await leadsApi.deleteLead(id);
      if (res.success) {
        setSelectedLead(null);
        toast.success('Lead deleted successfully');
        fetchLeads();
        fetchMetrics();
        fetchUsers();
      } else {
        toast.error(res.message || 'Failed to delete lead');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete lead');
    }
  };

  const handleAddNote = async (id, noteText) => {
    try {
      const res = await leadsApi.addNote(id, noteText);
      if (res.success && res.data?.lead) {
        setSelectedLead(res.data.lead);
        toast.success('Note added successfully');
        fetchLeads();
      } else {
        toast.error(res.message || 'Failed to add note');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to add note');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await usersApi.updateRole(userId, newRole);
      if (res.success) {
        toast.success('User role updated successfully');
        fetchUsers();
      } else {
        toast.error(res.message || 'Failed to update role');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update role');
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const res = await usersApi.updateStatus(userId, newStatus);
      if (res.success) {
        toast.success('User status updated successfully');
        fetchUsers();
      } else {
        toast.error(res.message || 'Failed to update user status');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update user status');
    }
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100 border border-slate-200 p-1 rounded-xl">
                <TabsTrigger value="overview" className="gap-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs font-heading">
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="leads" className="gap-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs font-heading">
                  <ListFilter className="w-4 h-4 text-emerald-600" />
                  Leads Pipeline
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger value="users" className="gap-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs font-heading">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Team Members
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 uppercase font-extrabold bg-emerald-50 text-emerald-700 border-emerald-200">Admin</Badge>
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            {!isAdmin && (
              <span className="text-xs text-slate-600 font-medium hidden md:inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                Member Role (Read & Pipeline Edit)
              </span>
            )}
            <Button onClick={() => setIsCreateOpen(true)} className="gap-1.5 text-xs py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-500/20">
              <Plus className="w-4 h-4" />
              New Lead
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab metrics={metrics} onNavigateToLeads={() => setActiveTab('leads')} />
        )}

        {activeTab === 'leads' && (
          <LeadsTab
            leads={leads}
            pagination={pagination}
            filters={filters}
            onFilterChange={handleFilterChange}
            onOpenCreateModal={() => setIsCreateOpen(true)}
            onSelectLead={(lead) => setSelectedLead(lead)}
            users={users}
          />
        )}

        {activeTab === 'users' && isAdmin && (
          <UsersTab
            users={users}
            onRoleChange={handleRoleChange}
            onStatusChange={handleStatusChange}
            currentUser={user}
          />
        )}
      </div>

      {/* Modals */}
      <CreateLeadModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateLead}
        users={users}
      />

      <LeadDetailModal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
        onUpdate={handleUpdateLead}
        onDelete={handleDeleteLead}
        onAddNote={handleAddNote}
        users={users}
      />

      <Footer />
    </div>
  );
};
