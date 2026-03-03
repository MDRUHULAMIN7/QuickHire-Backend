import { Job } from './job.model.js';
import type { TJob, TJobUpdate } from './job.interface.js';
import QueryBuilder from '../../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';
import { StatusCodes } from 'http-status-codes';
import { JOB_CATEGORIES, searchFeilds } from './job.constant.js';

const getJoblistFromDB = async (query: Record<string, unknown>) => {
  const normalizedQuery = { ...query };
  const rawLocation = normalizedQuery.location;
  if (typeof rawLocation === 'string' && rawLocation.trim()) {
    normalizedQuery.location = {
      $regex: rawLocation.trim(),
      $options: 'i',
    };
  }

  const qb = new QueryBuilder(Job.find(), normalizedQuery)
    .search(searchFeilds as unknown as string[])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await qb.countTotal();
  const data = await qb.modelQuery;
  return { meta, data };
};

const getJobByIdFromDB = async (id: string) => {
  const item = await Job.findById(id);
  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Job not found');
  }
  return item;
};

const createJobToDB = async (payload: TJob) => {
  const exists = await Job.findOne({
    title: new RegExp(`^${payload.title}$`, 'i'),
    company: new RegExp(`^${payload.company}$`, 'i'),
    location: new RegExp(`^${payload.location}$`, 'i'),
  });
  if (exists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'A similar job already exists for this company and location',
    );
  }
  const item = await Job.create(payload);
  return item;
};

const updateJobInDB = async (id: string, payload: TJobUpdate) => {
  const item = await Job.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Job not found');
  }
  return item;
};

const removeJobFromDB = async (id: string) => {
  const item = await Job.findByIdAndDelete(id);
  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Job not found');
  }
  return item;
};

const getCategorySummaryFromDB = async () => {
  const agg = await Job.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);
  const map = new Map<string, number>(agg.map((a: any) => [a._id, a.count]));
  return JOB_CATEGORIES.map((c) => ({
    key: c.key,
    name: c.name,
    icon: c.icon,
    count: map.get(c.name) ?? 0,
  }));
};

const getFeaturedJobsFromDB = async (limit = 8) => {
  const items = await Job.find().sort({ createdAt: -1 }).limit(limit);
  return items;
};

const getLatestJobsFromDB = async (limit = 8) => {
  const items = await Job.find().sort({ createdAt: -1 }).limit(limit);
  return items;
};

export const JobService = {
  getJoblistFromDB,
  getJobByIdFromDB,
  createJobToDB,
  updateJobInDB,
  removeJobFromDB,
  getCategorySummaryFromDB,
  getFeaturedJobsFromDB,
  getLatestJobsFromDB,
};
