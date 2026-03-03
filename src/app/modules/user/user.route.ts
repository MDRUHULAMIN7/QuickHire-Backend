import express from 'express';
import { userControllers } from './user.controller.js';
import auth from '../../middleware/auth.js';
import { USER_ROLE } from './user.constant.js';
import validateRequest from '../../middleware/validateRequest.js';
import { UserValidation } from './user.validation.js';

const router = express.Router();

router.get(
  '/me',
  auth(USER_ROLE.Admin, USER_ROLE.User),
  userControllers.getMe,
);

router.patch(
  '/me',
  auth(USER_ROLE.Admin, USER_ROLE.User),
  validateRequest(UserValidation.updateProfileValidationSchema),
  userControllers.updateMe,
);

export const UserRoutes = router;
