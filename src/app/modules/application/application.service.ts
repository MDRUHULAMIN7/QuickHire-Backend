import { Application } from "./application.model.js";
import type { TApplication } from "./application.interface.js";
import { Job } from "../job/job.model.js";
import AppError from "../../errors/AppError.js";
import { StatusCodes } from "http-status-codes";

const create = async (payload: TApplication) => {
  const job = await Job.findById(payload.job);
  if (!job) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid job reference");
  }
  const exists = await Application.findOne({ job: payload.job, email: payload.email });
  if (exists) {
    throw new AppError(StatusCodes.CONFLICT, "You have already applied to this job with this email");
  }
  const item = await Application.create(payload);
  return item;
};

export const ApplicationService = {
  create,
};
