import { Router } from 'express';
import { ReportsController } from './reports.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/overview', ReportsController.getOverview);
router.get('/status', ReportsController.getStatusDistribution);
router.get('/source', ReportsController.getSourceAnalytics);
router.get('/trend', ReportsController.getTrend);
router.get('/priority', ReportsController.getPriorityDistribution);
router.get('/performance', ReportsController.getUserPerformance);
router.get('/activity', ReportsController.getRecentActivity);
router.get('/export/csv', ReportsController.exportCsv);

export default router;
