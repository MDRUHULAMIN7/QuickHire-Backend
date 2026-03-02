import express from 'express';
import validateRequest from '../../middleware/validateRequest.js';
import { JobValidation } from './job.validation.js';
import { JobController } from './job.controller.js';
import auth from '../../middleware/auth.js';
import { USER_ROLE } from '../user/user.constant.js';

const router = express.Router();

router.get('/', JobController.getJoblist);
router.get('/:id', JobController.getJobById);
router.get('/_summary/categories', JobController.getCategorySummary);
router.get('/_featured', JobController.getFeatured);
router.get('/_latest', JobController.getLatest);
router.post(
  '/',
  auth(USER_ROLE.Admin),
  validateRequest(JobValidation.create),
  JobController.createJob,
);
router.patch(
  '/:id',
  auth(USER_ROLE.Admin),
  validateRequest(JobValidation.update),
  JobController.updateJob,
);
router.delete('/:id', auth(USER_ROLE.Admin), JobController.removeJob);

export const JobRoutes = router;
