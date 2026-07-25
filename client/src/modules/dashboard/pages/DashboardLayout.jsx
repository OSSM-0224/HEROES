import React from 'react';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { Footer } from '../../../components/common/Footer.jsx';
import { OverviewTab } from '../components/OverviewTab.jsx';
import { LeadsTab } from '../components/LeadsTab.jsx';
import { UsersTab } from '../components/UsersTab.jsx';
import { LeadDetailModal } from '../components/LeadDetailModal.jsx';
import { CreateLeadModal } from '../components/CreateLeadModal.jsx';
import { useDashboard } from '../hooks/useDashboard.js';
import { LayoutDashboard, Users, ListFilter, Plus, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../../../components/common/Button.jsx';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DashboardLayout = () => {
  const {
    user, activeTab, setActiveTab,
    leads, pagination, metrics, loading,
    selectedLead, setSelectedLead,
    isCreateOpen, setIsCreateOpen,
    users, filters,
    handleFilterChange, handleCreateLead,
    handleUpdateLead, handleDeleteLead,
    handleAddNote, handleRoleChange, handleStatusChange,
    isAdmin,
  } = useDashboard();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
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
