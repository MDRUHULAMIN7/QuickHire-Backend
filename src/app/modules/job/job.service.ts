import { Job } from "./job.model.js";
import type { TJob } from "./job.interface.js";
import QueryBuilder from "../../../builder/QueryBuilder.js";
import AppError from "../../errors/AppError.js";
import { StatusCodes } from "http-status-codes";

const getJoblistFromDB = async (query: Record<string, unknown>) => {
  const searchable = ["title", "company", "location", "category"];
  const qb = new QueryBuilder(Job.find(), query).search(searchable).filter().sort().paginate().fields();
  const meta = await qb.countTotal();
  const data = await qb.modelQuery;
  return { meta, data };
};

const getJobByIdFromDB = async (id: string) => {
  const item = await Job.findById(id);
  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found");
  }
  return item;
};

const createJobToDB = async (payload: TJob) => {
  const exists = await Job.findOne({
    title: new RegExp(`^${payload.title}$`, "i"),
    company: new RegExp(`^${payload.company}$`, "i"),
    location: new RegExp(`^${payload.location}$`, "i"),
  });
  if (exists) {
    throw new AppError(StatusCodes.CONFLICT, "A similar job already exists for this company and location");
  }
  const item = await Job.create(payload);
  return item;
};

const removeJobFromDB = async (id: string) => {
  const item = await Job.findByIdAndDelete(id);
  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found");
  }
  return item;
};

export const JobService = {
  getJoblistFromDB,
  getJobByIdFromDB,
  createJobToDB,
  removeJobFromDB,
};
