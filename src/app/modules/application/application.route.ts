import express from 'express';
import validateRequest from '../../middleware/validateRequest.js';
import { ApplicationValidation } from './application.validation.js';
import { ApplicationController } from './application.controller.js';
import auth from '../../middleware/auth.js';
import { USER_ROLE } from '../user/user.constant.js';

const router = express.Router();

router.post(
  '/',
  validateRequest(ApplicationValidation.create),
  ApplicationController.createApplication,
);
router.get(
  '/',
  auth(USER_ROLE.Admin),
  ApplicationController.getApplicationlist,
);
router.get(
  '/:id',
  auth(USER_ROLE.Admin),
  ApplicationController.getApplicationById,
);
router.patch(
  '/:id/status',
  auth(USER_ROLE.Admin),
  validateRequest(ApplicationValidation.changeStatus),
  ApplicationController.changeApplicationStatus,
);

export const ApplicationRoutes = router;
