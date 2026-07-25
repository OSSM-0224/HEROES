import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../../services/auth.service.jsx';
import { leadsApi } from '../api/leads.api.js';
import { usersApi } from '../api/users.api.js';

export const useDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
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

  return {
    user,
    activeTab,
    setActiveTab,
    leads,
    pagination,
    metrics,
    loading,
    selectedLead,
    setSelectedLead,
    isCreateOpen,
    setIsCreateOpen,
    users,
    filters,
    handleFilterChange,
    handleCreateLead,
    handleUpdateLead,
    handleDeleteLead,
    handleAddNote,
    handleRoleChange,
    handleStatusChange,
    isAdmin: user?.role === 'ADMIN',
  };
};
