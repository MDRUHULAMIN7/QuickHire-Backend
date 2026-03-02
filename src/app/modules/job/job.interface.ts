import type { EMPLOYMENT_TYPES } from './job.constant.js';

export type TJob = {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  employment_type: (typeof EMPLOYMENT_TYPES)[number];
  tags?: string[];
  company_logo_url: string;
  createdAt?: Date;
};

export type TJobUpdate = Partial<TJob>;
