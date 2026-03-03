
import sendResponse from '../../utils/sendResponse.js';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/CatchAsync.js';
import { userServices } from './user.service.js';

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found !');
  // }

  const { userId } = req.user;

  const result = await userServices.getMe(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await userServices.updateMe(userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
export const userControllers = {
  getMe,
  updateMe,
  changeStatus,
};
