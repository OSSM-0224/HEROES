import { UserService } from './user.service.js';
import { sendSuccess } from '../../utils/response.js';

export const UserController = {
  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers(req.user.organizationId);
      return sendSuccess(res, 'Users retrieved', { users });
    } catch (error) {
      next(error);
    }
  },

  async updateRole(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const updatedUser = await UserService.updateUserRole(id, role, req.user.organizationId, req.user.id);
      return sendSuccess(res, 'User role updated', { user: updatedUser });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedUser = await UserService.updateUserStatus(id, status, req.user.organizationId, req.user.id);
      return sendSuccess(res, 'User status updated', { user: updatedUser });
    } catch (error) {
      next(error);
    }
  },
};
