import { UserRepository } from './user.repository.js';
import { NotFoundError } from '../../utils/errors.js';

export const UserService = {
  async getAllUsers() {
    return UserRepository.findAll();
  },

  async updateUserRole(id, role) {
    const user = await UserRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return UserRepository.updateRole(id, role);
  },

  async updateUserStatus(id, status) {
    const user = await UserRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return UserRepository.updateStatus(id, status);
  },
};
