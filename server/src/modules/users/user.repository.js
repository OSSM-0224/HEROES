import { User } from '../auth/auth.model.js';

export const UserRepository = {
  async findAll() {
    return User.find().select('-password').sort({ createdAt: -1 });
  },

  async findById(id) {
    return User.findById(id).select('-password');
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
