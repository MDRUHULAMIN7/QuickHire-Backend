import type { Types } from 'mongoose';
export type TApplication = {
  job: Types.ObjectId | string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  createdAt?: Date;
};
