import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse.js';
import catchAsync from '../../utils/CatchAsync.js';
import { JobService } from './job.service.js';
import type { Request, Response } from 'express';

const getJoblist = catchAsync(async (req, res) => {
  const result = await JobService.getJoblistFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Jobs retrieved',
    meta: result.meta,
    data: result.data,
  });
});

const getJobById = catchAsync(async (req, res) => {
  const item = await JobService.getJobByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Job details',
    data: item,
  });
});

const getCategorySummary = catchAsync(async (req: Request, res: Response) => {
  const items = await JobService.getCategorySummaryFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category summary',
    data: items,
  });
});

const getFeatured = catchAsync(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit ?? 8);
  const items = await JobService.getFeaturedJobsFromDB(limit);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Featured jobs',
    data: items,
  });
});

const getLatest = catchAsync(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit ?? 8);
  const items = await JobService.getLatestJobsFromDB(limit);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Latest jobs',
    data: items,
  });
});

const createJob = catchAsync(async (req, res) => {
  const item = await JobService.createJobToDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Job created',
    data: item,
  });
});

const updateJob = catchAsync(async (req, res) => {
  const item = await JobService.updateJobInDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Job updated',
    data: item,
  });
});

const removeJob = catchAsync(async (req, res) => {
  const item = await JobService.removeJobFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Job deleted',
    data: item,
  });
});

export const JobController = {
  getJoblist,
  getJobById,
  getCategorySummary,
  getFeatured,
  getLatest,
  createJob,
  updateJob,
  removeJob,
};
