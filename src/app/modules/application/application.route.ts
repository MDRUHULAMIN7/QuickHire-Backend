import express from "express";
import validateRequest from "../../middleware/validateRequest.js";
import { ApplicationValidation } from "./application.validation.js";
import { ApplicationController } from "./application.controller.js";

const router = express.Router();

router.post("/", validateRequest(ApplicationValidation.create), ApplicationController.create);

export const ApplicationRoutes = router;
