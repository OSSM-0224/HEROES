import { LeadRepository } from './lead.repository.js';
import { UserRepository } from '../users/user.repository.js';
import { NotFoundError, ForbiddenError, BadRequestError } from '../../utils/errors.js';

export const LeadService = {
  async getLeads(filters, user) {
    // If member role, allow viewing all or filtered
    return LeadRepository.findWithFilters(filters);
  },

  async getLeadById(id) {
    const lead = await LeadRepository.findById(id);
    if (!lead) throw new NotFoundError('Lead not found');
    return lead;
  },

  async createLead(data, user) {
    const slaDueDate = new Date();
    slaDueDate.setHours(slaDueDate.getHours() + 24); // 24hr SLA

    const activity = {
      type: 'LEAD_CREATED',
      description: `Lead created by ${user ? user.name : 'Public Submission'}`,
      performedBy: user ? user.id : null,
      performedByName: user ? user.name : 'Public Form',
    };

    const leadData = {
      ...data,
      slaDueDate,
      activityLog: [activity],
    };

    const newLead = await LeadRepository.createLead(leadData);

    if (data.assignedTo) {
      await UserRepository.updateLeadCount(data.assignedTo, 1);
    }

    return newLead;
  },

  async updateLead(id, updateData, user) {
    const existingLead = await LeadRepository.findById(id);
    if (!existingLead) throw new NotFoundError('Lead not found');

    let activity = null;

    if (updateData.status && updateData.status !== existingLead.status) {
      activity = {
        type: 'STATUS_CHANGE',
        description: `Status changed from "${existingLead.status}" to "${updateData.status}"`,
        performedBy: user.id,
        performedByName: user.name,
      };
    }

    if (updateData.assignedTo !== undefined && String(updateData.assignedTo) !== String(existingLead.assignedTo?._id)) {
      const newAssignedUser = updateData.assignedTo ? await UserRepository.findById(updateData.assignedTo) : null;
      activity = {
        type: 'ASSIGNMENT',
        description: newAssignedUser
          ? `Lead assigned to ${newAssignedUser.name}`
          : 'Lead unassigned',
        performedBy: user.id,
        performedByName: user.name,
      };

      if (existingLead.assignedTo?._id) {
        await UserRepository.updateLeadCount(existingLead.assignedTo._id, -1);
      }
      if (updateData.assignedTo) {
        await UserRepository.updateLeadCount(updateData.assignedTo, 1);
      }
    }

    const updatedLead = await LeadRepository.updateLead(id, updateData);

    if (activity) {
      await LeadRepository.logActivity(id, activity);
    }

    return LeadRepository.findById(id);
  },

  async deleteLead(id, user) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenError('Only administrators can delete leads');
    }

    const lead = await LeadRepository.findById(id);
    if (!lead) throw new NotFoundError('Lead not found');

    if (lead.assignedTo?._id) {
      await UserRepository.updateLeadCount(lead.assignedTo._id, -1);
    }

    return LeadRepository.deleteLead(id);
  },

  async addNote(id, noteText, user) {
    const lead = await LeadRepository.findById(id);
    if (!lead) throw new NotFoundError('Lead not found');

    const note = {
      text: noteText,
      createdBy: user.id,
      createdByName: user.name,
      createdAt: new Date(),
    };

    const activity = {
      type: 'NOTE_ADDED',
      description: `Added note: "${noteText.length > 30 ? noteText.substring(0, 30) + '...' : noteText}"`,
      performedBy: user.id,
      performedByName: user.name,
    };

    await LeadRepository.addNote(id, note);
    await LeadRepository.logActivity(id, activity);

    return LeadRepository.findById(id);
  },

  async getDashboardMetrics() {
    return LeadRepository.getMetrics();
  },
};
