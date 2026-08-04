import { UserRepository } from './user.repository.js';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';

export const UserService = {
  async getAllUsers(organizationId) {
    return UserRepository.findAll(organizationId);
  },

  async updateUserRole(id, role, organizationId, currentUserId) {
    const user = await UserRepository.findByIdInOrg(id, organizationId);
    if (!user) throw new NotFoundError('User not found');

    if (String(user._id) === String(currentUserId)) {
      throw new BadRequestError('You cannot change your own role');
    }

    if (role !== 'ADMIN') {
      const adminCount = await UserRepository.countAdminsInOrg(organizationId);
      if (adminCount <= 1) {
        throw new BadRequestError('Your organization must keep at least one ADMIN');
      }
    }

    return UserRepository.updateRole(id, role);
  },

  async updateUserStatus(id, status, organizationId, currentUserId) {
    const user = await UserRepository.findByIdInOrg(id, organizationId);
    if (!user) throw new NotFoundError('User not found');

    if (String(user._id) === String(currentUserId)) {
      throw new BadRequestError('You cannot change your own status');
    }

    if (status === 'INACTIVE' && user.role === 'ADMIN') {
      const adminCount = await UserRepository.countAdminsInOrg(organizationId);
      if (adminCount <= 1) {
        throw new BadRequestError('Your organization must keep at least one active ADMIN');
      }
    }

    return UserRepository.updateStatus(id, status);
  },
};
