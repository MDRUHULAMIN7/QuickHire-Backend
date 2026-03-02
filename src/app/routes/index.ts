import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route.js';
import { JobRoutes } from '../modules/job/job.route.js';
import { ApplicationRoutes } from '../modules/application/application.route.js';
import { AuthRoutes } from '../modules/Auth/auth.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/jobs',
    route: JobRoutes,
  },
  {
    path: '/applications',
    route: ApplicationRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
