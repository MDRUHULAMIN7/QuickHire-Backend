import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse.js";
import catchAsync from "../../utils/CatchAsync.js";
import { ApplicationService } from "./application.service.js";

const create = catchAsync(async (req, res) => {
  const item = await ApplicationService.create(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Application submitted",
    data: item,
  });
});

export const ApplicationController = {
  create,
};
