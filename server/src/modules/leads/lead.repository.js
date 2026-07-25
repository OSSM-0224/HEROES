import { Lead } from './lead.model.js';

export const LeadRepository = {
  async findWithFilters({ search, status, priority, assignedTo, page = 1, limit = 20, sort = '-createdAt' }) {
    const query = {};

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

  async findById(id) {
    return Lead.findById(id).populate('assignedTo', 'name email role');
  },

  async createLead(leadData) {
    const lead = new Lead(leadData);
    return lead.save();
  },

  async updateLead(id, updateData) {
    return Lead.findByIdAndUpdate(id, updateData, { new: true }).populate('assignedTo', 'name email role');
  },

  async deleteLead(id) {
    return Lead.findByIdAndDelete(id);
  },

  async addNote(id, note) {
    return Lead.findByIdAndUpdate(
      id,
      { $push: { notes: note } },
      { new: true }
    ).populate('assignedTo', 'name email role');
  },

  async logActivity(id, activity) {
    return Lead.findByIdAndUpdate(
      id,
      { $push: { activityLog: activity } },
      { new: true }
    );
  },

  async getMetrics() {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const wonLeads = await Lead.countDocuments({ status: 'Closed Won' });
    const qualifiedLeads = await Lead.countDocuments({ status: 'Qualified' });
    
    const valueAggregation = await Lead.aggregate([
      { $group: { _id: null, totalValue: { $sum: '$value' } } },
    ]);
    const totalPipelineValue = valueAggregation[0]?.totalValue || 0;

    const statusCounts = await Lead.aggregate([
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
