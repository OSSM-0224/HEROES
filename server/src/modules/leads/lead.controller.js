import { LeadService } from './lead.service.js';
import { sendSuccess } from '../../utils/response.js';

export const LeadController = {
  async getLeads(req, res, next) {
    try {
      const { search, status, priority, assignedTo, page, limit, sort } = req.query;
      const result = await LeadService.getLeads(
        {
          search,
          status,
          priority,
          assignedTo,
          page: Number(page) || 1,
          limit: Number(limit) || 20,
          sort,
        },
        req.user
      );
      return sendSuccess(res, 'Leads retrieved', result.leads, 200, result.pagination);
    } catch (error) {
      next(error);
    }
  },

  async getLeadById(req, res, next) {
    try {
      const lead = await LeadService.getLeadById(req.params.id);
      return sendSuccess(res, 'Lead details retrieved', { lead });
    } catch (error) {
      next(error);
    }
  },

  async createLead(req, res, next) {
    try {
      const lead = await LeadService.createLead(req.body, req.user);
      return sendSuccess(res, 'Lead created successfully', { lead }, 201);
    } catch (error) {
      next(error);
    }
  },

  async createPublicLead(req, res, next) {
    try {
      const lead = await LeadService.createLead({
        ...req.body,
        source: 'Public Form',
      }, null);
      return sendSuccess(res, 'Thank you! Your information has been submitted.', { lead }, 201);
    } catch (error) {
      next(error);
    }
  },

  async updateLead(req, res, next) {
    try {
      const lead = await LeadService.updateLead(req.params.id, req.body, req.user);
      return sendSuccess(res, 'Lead updated successfully', { lead });
    } catch (error) {
      next(error);
    }
  },

  async deleteLead(req, res, next) {
    try {
      await LeadService.deleteLead(req.params.id, req.user);
      return sendSuccess(res, 'Lead deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  async addNote(req, res, next) {
    try {
      const lead = await LeadService.addNote(req.params.id, req.body.text, req.user);
      return sendSuccess(res, 'Note added successfully', { lead });
    } catch (error) {
      next(error);
    }
  },

  async getMetrics(req, res, next) {
    try {
      const metrics = await LeadService.getDashboardMetrics();
      return sendSuccess(res, 'Metrics retrieved', { metrics });
    } catch (error) {
      next(error);
    }
  },
};
