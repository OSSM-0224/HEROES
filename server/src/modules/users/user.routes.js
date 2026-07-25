import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const roleSchema = {
  body: z.object({
    role: z.enum(['ADMIN', 'MEMBER']),
  }),
};

const statusSchema = {
  body: z.object({
    status: z.enum(['ACTIVE', 'INACTIVE']),
  }),
};

router.use(authenticate);

router.get('/', UserController.getUsers);
router.patch('/:id/role', authorize('ADMIN'), validate(roleSchema), UserController.updateRole);
router.patch('/:id/status', authorize('ADMIN'), validate(statusSchema), UserController.updateStatus);

export default router;
