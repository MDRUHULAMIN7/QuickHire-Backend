import { StatusCodes } from 'http-status-codes';
import { User } from './user.model.js';
import AppError from '../../errors/AppError.js';

const getMe = async (userId: string) => {
  const user = await User.findOne({ id: userId }).select('-password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  return user;
};

const updateMe = async (
  userId: string,
  payload: { name?: string; avatarUrl?: string },
) => {
  const result = await User.findOneAndUpdate(
    { id: userId },
    {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.avatarUrl !== undefined ? { avatarUrl: payload.avatarUrl } : {}),
    },
    { new: true, runValidators: true },
  ).select('-password');
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const userServices = {
  getMe,
  updateMe,
  changeStatus,
};
