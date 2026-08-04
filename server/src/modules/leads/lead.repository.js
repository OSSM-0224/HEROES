import mongoose from 'mongoose';
import { Lead } from './lead.model.js';

export const LeadRepository = {
  async findWithFilters({ organizationId, search, status, priority, assignedTo, page = 1, limit = 20, sort = '-createdAt' }) {
    const query = { organizationId };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (priority && priority !== 'ALL') {
      query.priority = priority;
    }

    if (assignedTo && assignedTo !== 'ALL') {
      if (assignedTo === 'UNASSIGNED') {
        query.assignedTo = null;
      } else {
        query.assignedTo = assignedTo;
      }
    }

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .populate('assignedTo', 'name email role')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Lead.countDocuments(query),
    ]);

    return {
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  async findById(id, organizationId) {
    return Lead.findOne({ _id: id, organizationId }).populate('assignedTo', 'name email role');
  },

  async createLead(leadData) {
    const lead = new Lead(leadData);
    return lead.save();
  },

  async updateLead(id, organizationId, updateData) {
    return Lead.findOneAndUpdate({ _id: id, organizationId }, updateData, { new: true }).populate('assignedTo', 'name email role');
  },

  async deleteLead(id, organizationId) {
    return Lead.findOneAndDelete({ _id: id, organizationId });
  },

  async addNote(id, organizationId, note) {
    return Lead.findOneAndUpdate(
      { _id: id, organizationId },
      { $push: { notes: note } },
      { new: true }
    ).populate('assignedTo', 'name email role');
  },

  async logActivity(id, organizationId, activity) {
    return Lead.findOneAndUpdate(
      { _id: id, organizationId },
      { $push: { activityLog: activity } },
      { new: true }
    );
  },

  async getMetrics(organizationId) {
    const orgMatch = { organizationId };
    const orgAggregateMatch = { organizationId: new mongoose.Types.ObjectId(organizationId) };

    const totalLeads = await Lead.countDocuments(orgMatch);
    const newLeads = await Lead.countDocuments({ ...orgMatch, status: 'New' });
    const wonLeads = await Lead.countDocuments({ ...orgMatch, status: 'Closed Won' });
    const qualifiedLeads = await Lead.countDocuments({ ...orgMatch, status: 'Qualified' });
    
    const valueAggregation = await Lead.aggregate([
      { $match: orgAggregateMatch },
      { $group: { _id: null, totalValue: { $sum: '$value' } } },
    ]);
    const totalPipelineValue = valueAggregation[0]?.totalValue || 0;

    const statusCounts = await Lead.aggregate([
      { $match: orgAggregateMatch },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return {
      totalLeads,
      newLeads,
      wonLeads,
      qualifiedLeads,
      totalPipelineValue,
      statusCounts: statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
    };
  },
};
