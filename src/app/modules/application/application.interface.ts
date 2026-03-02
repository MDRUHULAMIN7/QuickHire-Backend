import type { Types } from 'mongoose';
export type TApplication = {
  job: Types.ObjectId | string;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  createdAt?: Date;
};
