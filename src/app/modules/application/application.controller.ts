import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse.js';
import catchAsync from '../../utils/CatchAsync.js';
import { ApplicationService } from './application.service.js';

const createApplication = catchAsync(async (req, res) => {
  const item = await ApplicationService.createApplicationToDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Application submitted',
    data: item,
  });
});

const getApplicationlist = catchAsync(async (req, res) => {
  const result = await ApplicationService.getApplicationlistFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Applications retrieved',
    meta: result.meta,
    data: result.data,
  });
});

const getApplicationById = catchAsync(async (req, res) => {
  const item = await ApplicationService.getApplicationByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Application details',
    data: item,
  });
});

const changeApplicationStatus = catchAsync(async (req, res) => {
  const item = await ApplicationService.changeApplicationStatusInDB(
    req.params.id,
    req.body.status,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Application status updated',
    data: item,
  });
});

export const ApplicationController = {
  createApplication,
  getApplicationlist,
  getApplicationById,
  changeApplicationStatus,
};
