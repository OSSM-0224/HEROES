import { Router } from 'express';
import { LeadController } from './lead.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const createLeadSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    status: z.enum(['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost']).optional(),
    priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
    value: z.number().min(0).optional(),
    source: z.string().optional(),
    assignedTo: z.string().nullable().optional(),
    tags: z.array(z.string()).optional(),
  }),
};

const noteSchema = {
  body: z.object({
    text: z.string().min(1, 'Note text cannot be empty'),
  }),
};

// Public capture endpoint (no auth required)
router.post('/public', validate(createLeadSchema), LeadController.createPublicLead);

// Authenticated routes
router.use(authenticate);

router.get('/metrics', LeadController.getMetrics);
router.get('/', LeadController.getLeads);
router.post('/', validate(createLeadSchema), LeadController.createLead);
router.get('/:id', LeadController.getLeadById);
router.put('/:id', LeadController.updateLead);
router.delete('/:id', authorize('ADMIN'), LeadController.deleteLead);
router.post('/:id/notes', validate(noteSchema), LeadController.addNote);

export default router;
