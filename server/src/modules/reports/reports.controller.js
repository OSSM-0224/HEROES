import { ReportsService } from './reports.service.js';
import { sendSuccess } from '../../utils/response.js';

export const ReportsController = {
  async getOverview(req, res, next) {
    try {
      const { dateFrom, dateTo } = req.query;
      const data = await ReportsService.getOverview({ dateFrom, dateTo });
      return sendSuccess(res, 'Overview metrics retrieved', data);
    } catch (error) {
      next(error);
    }
  },

  async getStatusDistribution(req, res, next) {
    try {
      const { dateFrom, dateTo } = req.query;
      const data = await ReportsService.getStatusDistribution({ dateFrom, dateTo });
      return sendSuccess(res, 'Status distribution retrieved', { distribution: data });
    } catch (error) {
      next(error);
    }
  },

  async getSourceAnalytics(req, res, next) {
    try {
      const { dateFrom, dateTo } = req.query;
      const data = await ReportsService.getSourceAnalytics({ dateFrom, dateTo });
      return sendSuccess(res, 'Source analytics retrieved', { sources: data });
    } catch (error) {
      next(error);
    }
  },

  async getTrend(req, res, next) {
    try {
      const { dateFrom, dateTo, groupBy } = req.query;
      const data = await ReportsService.getTrend({ dateFrom, dateTo, groupBy });
      return sendSuccess(res, 'Trend data retrieved', { trend: data });
    } catch (error) {
      next(error);
    }
  },

  async getPriorityDistribution(req, res, next) {
    try {
      const { dateFrom, dateTo } = req.query;
      const data = await ReportsService.getPriorityDistribution({ dateFrom, dateTo });
      return sendSuccess(res, 'Priority distribution retrieved', { distribution: data });
    } catch (error) {
      next(error);
    }
  },

  async getUserPerformance(req, res, next) {
    try {
      const { dateFrom, dateTo } = req.query;
      const data = await ReportsService.getUserPerformance({ dateFrom, dateTo });
      return sendSuccess(res, 'User performance retrieved', { performance: data });
    } catch (error) {
      next(error);
    }
  },

  async getRecentActivity(req, res, next) {
    try {
      const { dateFrom, dateTo } = req.query;
      const data = await ReportsService.getRecentActivity({ dateFrom, dateTo });
      return sendSuccess(res, 'Recent activity retrieved', { activity: data });
    } catch (error) {
      next(error);
    }
  },

  async exportCsv(req, res, next) {
    try {
      const { dateFrom, dateTo } = req.query;
      const csv = await ReportsService.getExportData({ dateFrom, dateTo, format: 'csv' });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="heroes-report-${new Date().toISOString().split('T')[0]}.csv"`);
      return res.send(csv);
    } catch (error) {
      next(error);
    }
  },
};
