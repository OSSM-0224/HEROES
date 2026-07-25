import { Lead } from '../leads/lead.model.js';
import { User } from '../auth/auth.model.js';

const buildDateMatch = (dateFrom, dateTo) => {
  const match = {};
  if (dateFrom || dateTo) {
    match.createdAt = {};
    if (dateFrom) match.createdAt.$gte = new Date(dateFrom);
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      match.createdAt.$lte = end;
    }
  }
  return match;
};

export const ReportsService = {
  async getOverview({ dateFrom, dateTo }) {
    const dateMatch = buildDateMatch(dateFrom, dateTo);

    const baseMatch = { ...dateMatch };
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const overview = await Lead.aggregate([
      {
        $facet: {
          total: [
            { $match: baseMatch },
            { $count: 'count' },
          ],
          today: [
            { $match: { ...baseMatch, createdAt: { $gte: todayStart } } },
            { $count: 'count' },
          ],
          week: [
            { $match: { ...baseMatch, createdAt: { $gte: weekStart } } },
            { $count: 'count' },
          ],
          month: [
            { $match: { ...baseMatch, createdAt: { $gte: monthStart } } },
            { $count: 'count' },
          ],
          won: [
            { $match: { ...baseMatch, status: 'Closed Won' } },
            { $count: 'count' },
          ],
          lost: [
            { $match: { ...baseMatch, status: 'Closed Lost' } },
            { $count: 'count' },
          ],
          active: [
            { $match: { ...baseMatch, status: { $nin: ['Closed Won', 'Closed Lost'] } } },
            { $count: 'count' },
          ],
          totalValue: [
            { $match: baseMatch },
            { $group: { _id: null, total: { $sum: '$value' } } },
          ],
          slaBreached: [
            { $match: { ...baseMatch, slaDueDate: { $lt: new Date() }, status: { $nin: ['Closed Won', 'Closed Lost'] } } },
            { $count: 'count' },
          ],
          slaTotal: [
            { $match: { ...baseMatch, slaDueDate: { $ne: null } } },
            { $count: 'count' },
          ],
        },
      },
    ]);

    const r = overview[0];
    const total = r.total[0]?.count || 0;
    const won = r.won[0]?.count || 0;
    const conversionRate = total > 0 ? Number(((won / total) * 100).toFixed(1)) : 0;
    const slaTotal = r.slaTotal[0]?.count || 0;
    const slaBreached = r.slaBreached[0]?.count || 0;
    const slaCompliance = slaTotal > 0 ? Number((((slaTotal - slaBreached) / slaTotal) * 100).toFixed(1)) : 100;

    const avgResponseTime = await Lead.aggregate([
      { $match: { ...dateMatch, activityLog: { $elemMatch: { type: 'LEAD_CREATED' } } } },
      { $project: { firstActivity: { $arrayElemAt: ['$activityLog', 0] }, createdAt: 1 } },
      { $project: { responseTime: { $subtract: ['$firstActivity.createdAt', '$createdAt'] } } },
      { $group: { _id: null, avgMs: { $avg: '$responseTime' } } },
    ]);

    const avgHours = avgResponseTime[0]?.avgMs
      ? Number((avgResponseTime[0].avgMs / (1000 * 60 * 60)).toFixed(1))
      : 0;

    return {
      totalLeads: total,
      newLeadsToday: r.today[0]?.count || 0,
      leadsThisWeek: r.week[0]?.count || 0,
      leadsThisMonth: r.month[0]?.count || 0,
      wonLeads: won,
      lostLeads: r.lost[0]?.count || 0,
      activeLeads: r.active[0]?.count || 0,
      totalPipelineValue: r.totalValue[0]?.total || 0,
      conversionRate,
      averageResponseTime: avgHours,
      slaCompliance,
    };
  },

  async getStatusDistribution({ dateFrom, dateTo }) {
    const match = buildDateMatch(dateFrom, dateTo);
    const result = await Lead.aggregate([
      { $match: match },
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return result.map((r) => ({ status: r._id, count: r.count }));
  },

  async getSourceAnalytics({ dateFrom, dateTo }) {
    const match = buildDateMatch(dateFrom, dateTo);
    const result = await Lead.aggregate([
      { $match: match },
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return result.map((r) => ({ source: r._id, count: r.count }));
  },

  async getTrend({ dateFrom, dateTo, groupBy = 'day' }) {
    const match = buildDateMatch(dateFrom, dateTo);
    let dateFormat;
    if (groupBy === 'month') {
      dateFormat = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
    } else if (groupBy === 'week') {
      dateFormat = { $dateToString: { format: '%G-W%V', date: '$createdAt' } };
    } else {
      dateFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    }

    const result = await Lead.aggregate([
      { $match: match },
      { $group: { _id: dateFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return result.map((r) => ({ date: r._id, count: r.count }));
  },

  async getPriorityDistribution({ dateFrom, dateTo }) {
    const match = buildDateMatch(dateFrom, dateTo);
    const result = await Lead.aggregate([
      { $match: match },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return result.map((r) => ({ priority: r._id, count: r.count }));
  },

  async getUserPerformance({ dateFrom, dateTo }) {
    const match = buildDateMatch(dateFrom, dateTo);

    const result = await Lead.aggregate([
      { $match: { ...match, assignedTo: { $ne: null } } },
      {
        $group: {
          _id: '$assignedTo',
          assigned: { $sum: 1 },
          won: { $sum: { $cond: [{ $eq: ['$status', 'Closed Won'] }, 1, 0] } },
          lost: { $sum: { $cond: [{ $eq: ['$status', 'Closed Lost'] }, 1, 0] } },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: false } },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: '$user.name',
          email: '$user.email',
          role: '$user.role',
          assigned: 1,
          won: 1,
          lost: 1,
          conversionRate: {
            $cond: [
              { $gt: ['$assigned', 0] },
              { $round: [{ $multiply: [{ $divide: ['$won', '$assigned'] }, 100] }, 1] },
              0,
            ],
          },
        },
      },
      { $sort: { assigned: -1 } },
    ]);

    return result;
  },

  async getRecentActivity({ dateFrom, dateTo, limit = 20 }) {
    const match = buildDateMatch(dateFrom, dateTo);
    const result = await Lead.aggregate([
      { $match: match },
      { $unwind: '$activityLog' },
      { $sort: { 'activityLog.createdAt': -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'activityLog.performedBy',
          foreignField: '_id',
          as: 'performer',
        },
      },
      {
        $project: {
          _id: 0,
          leadId: '$_id',
          leadName: '$name',
          leadEmail: '$email',
          type: '$activityLog.type',
          description: '$activityLog.description',
          performedByName: '$activityLog.performedByName',
          createdAt: '$activityLog.createdAt',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return result;
  },

  async getExportData({ dateFrom, dateTo, format = 'csv' }) {
    const match = buildDateMatch(dateFrom, dateTo);
    const leads = await Lead.find(match)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    if (format === 'csv') {
      const header = 'Name,Email,Phone,Company,Status,Priority,Value,Source,Assigned To,Created At,SLA Due Date\n';
      const rows = leads.map((l) => {
        const assigned = l.assignedTo?.name || 'Unassigned';
        const created = l.createdAt ? new Date(l.createdAt).toISOString().split('T')[0] : '';
        const sla = l.slaDueDate ? new Date(l.slaDueDate).toISOString().split('T')[0] : '';
        return `"${l.name}","${l.email}","${l.phone || ''}","${l.company || ''}",${l.status},${l.priority},${l.value},"${l.source}","${assigned}",${created},${sla}`;
      }).join('\n');
      return header + rows;
    }

    return { leads };
  },
};
