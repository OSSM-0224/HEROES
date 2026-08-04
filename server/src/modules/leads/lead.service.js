import { config } from '../../config/env.js';
import { LeadRepository } from './lead.repository.js';
import { UserRepository } from '../users/user.repository.js';
import { OrganizationService } from '../organization/organization.service.js';
import { NotFoundError, ForbiddenError, BadRequestError } from '../../utils/errors.js';

export const LeadService = {
  async getLeads(filters, user) {
    return LeadRepository.findWithFilters({
      ...filters,
      organizationId: user.organizationId,
    });
  },

  async getLeadById(id, user) {
    const lead = await LeadRepository.findById(id, user.organizationId);
    if (!lead) throw new NotFoundError('Lead not found');
    return lead;
  },

  async resolvePublicOrganization(slug) {
    if (slug) {
      const organization = await OrganizationService.findBySlug(slug);
      if (!organization) throw new NotFoundError('Organization not found');
      return organization._id;
    }
    const organization = await OrganizationService.ensure({
      name: 'HEROES Demo',
      slug: config.publicOrgSlug,
    });
    return organization._id;
  },

  async createLead(data, context = {}) {
    const { user = null, organizationId } = context;
    if (!organizationId) {
      throw new BadRequestError('Organization context is required');
    }

    const slaDueDate = new Date();
    slaDueDate.setHours(slaDueDate.getHours() + 24); // 24hr SLA

    const activity = {
      type: 'LEAD_CREATED',
      description: `Lead created by ${user ? user.name : 'Public Submission'}`,
      performedBy: user ? user.id : null,
      performedByName: user ? user.name : 'Public Form',
    };

    if (data.assignedTo) {
      const assignedUser = await UserRepository.findByIdInOrg(data.assignedTo, organizationId);
      if (!assignedUser) {
        throw new BadRequestError('Assigned representative does not belong to your organization');
      }
      await UserRepository.updateLeadCount(data.assignedTo, 1);
    }

    const leadData = {
      ...data,
      organizationId,
      slaDueDate,
      activityLog: [activity],
    };

    return LeadRepository.createLead(leadData);
  },

  async updateLead(id, updateData, user) {
    const existingLead = await LeadRepository.findById(id, user.organizationId);
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
      if (updateData.assignedTo) {
        const assignedUser = await UserRepository.findByIdInOrg(updateData.assignedTo, user.organizationId);
        if (!assignedUser) {
          throw new BadRequestError('Assigned representative does not belong to your organization');
        }
      }

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

    const updatedLead = await LeadRepository.updateLead(id, user.organizationId, updateData);

    if (activity) {
      await LeadRepository.logActivity(id, user.organizationId, activity);
    }

    return LeadRepository.findById(id, user.organizationId);
  },

  async deleteLead(id, user) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenError('Only administrators can delete leads');
    }

    const lead = await LeadRepository.findById(id, user.organizationId);
    if (!lead) throw new NotFoundError('Lead not found');

    if (lead.assignedTo?._id) {
      await UserRepository.updateLeadCount(lead.assignedTo._id, -1);
    }

    return LeadRepository.deleteLead(id, user.organizationId);
  },

  async addNote(id, noteText, user) {
    const lead = await LeadRepository.findById(id, user.organizationId);
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

    await LeadRepository.addNote(id, user.organizationId, note);
    await LeadRepository.logActivity(id, user.organizationId, activity);

    return LeadRepository.findById(id, user.organizationId);
  },

  async getDashboardMetrics(organizationId) {
    return LeadRepository.getMetrics(organizationId);
  },
};
