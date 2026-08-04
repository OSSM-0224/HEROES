import { User } from '../auth/auth.model.js';

export const UserRepository = {
  async findAll(organizationId) {
    return User.find({ organizationId }).select('-password').sort({ createdAt: -1 });
  },

  async findById(id) {
    return User.findById(id).select('-password');
  },

  async findByIdInOrg(id, organizationId) {
    return User.findOne({ _id: id, organizationId }).select('-password');
  },

  async countAdminsInOrg(organizationId) {
    return User.countDocuments({ organizationId, role: 'ADMIN', status: 'ACTIVE' });
  },

  async updateRole(id, role) {
    return User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
  },

  async updateStatus(id, status) {
    return User.findByIdAndUpdate(id, { status }, { new: true }).select('-password');
  },

  async updateLeadCount(id, delta) {
    return User.findByIdAndUpdate(id, { $inc: { assignedLeadsCount: delta } }, { new: true });
  }
};
