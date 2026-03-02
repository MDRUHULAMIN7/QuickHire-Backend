import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse.js";
import catchAsync from "../../utils/CatchAsync.js";
import { JobService } from "./job.service.js";

const getJoblist = catchAsync(async (req, res) => {
  const result = await JobService.getJoblistFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Jobs retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const getJobById = catchAsync(async (req, res) => {
  const item = await JobService.getJobByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job details",
    data: item,
  });
});

const createJob = catchAsync(async (req, res) => {
  const item = await JobService.createJobToDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Job created",
    data: item,
  });
});

const removeJob = catchAsync(async (req, res) => {
  const item = await JobService.removeJobFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Job deleted",
    data: item,
  });
});

export const JobController = {
  getJoblist,
  getJobById,
  createJob,
  removeJob,
};
