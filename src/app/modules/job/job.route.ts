import express from "express";
import validateRequest from "../../middleware/validateRequest.js";
import { JobValidation } from "./job.validation.js";
import { JobController } from "./job.controller.js";
import auth from "../../middleware/auth.js";
import { USER_ROLE } from "../user/user.constant.js";

const router = express.Router();

router.get("/", JobController.getJoblist);
router.get("/:id", JobController.getJobById);
router.post("/", auth(USER_ROLE.Admin), validateRequest(JobValidation.create), JobController.createJob);
router.delete("/:id", auth(USER_ROLE.Admin), JobController.removeJob);

export const JobRoutes = router;
