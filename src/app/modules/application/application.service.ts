import { Application } from './application.model.js';
import type { TApplication } from './application.interface.js';
import { Job } from '../job/job.model.js';
import AppError from '../../errors/AppError.js';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../../builder/QueryBuilder.js';
import { searchFields } from './application.constant.js';

const createApplicationToDB = async (payload: TApplication) => {
  const job = await Job.findById(payload.job);
  if (!job) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid job reference');
  }
  const exists = await Application.findOne({
    job: payload.job,
    email: payload.email,
  });
  if (exists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'You have already applied to this job with this email',
    );
  }
  const item = await Application.create(payload);
  return item;
};

const getApplicationlistFromDB = async (query: Record<string, unknown>) => {
 
  const qb = new QueryBuilder(Application.find().populate('job'), query)
    .search(searchFields as unknown as string[])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await qb.countTotal();
  const data = await qb.modelQuery;
  return { meta, data };
};

const getApplicationByIdFromDB = async (id: string) => {
  const item = await Application.findById(id).populate('job');
  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Application not found');
  }
  return item;
};

const changeApplicationStatusInDB = async (
  id: string,
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected',
) => {
  const item = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Application not found');
  }
  return item;
};

export const ApplicationService = {
  createApplicationToDB,
  getApplicationlistFromDB,
  getApplicationByIdFromDB,
  changeApplicationStatusInDB,
};
