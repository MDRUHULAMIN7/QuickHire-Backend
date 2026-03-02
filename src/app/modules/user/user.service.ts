import { StatusCodes } from 'http-status-codes';
import { User } from './user.model.js';
import AppError from '../../errors/AppError.js';

const getMe = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  return user;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const userServices = {
  getMe,
  changeStatus,
};
