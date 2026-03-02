import { z } from 'zod';
import { EMPLOYMENT_TYPES, JOB_CATEGORY_NAMES } from './job.constant.js';

export const JobValidation = {
  create: z.object({
    body: z.object({
      title: z.string().trim().min(2).max(100),
      company: z.string().trim().min(2).max(100),
      location: z.string().trim().min(2).max(100),
      category: z.enum(JOB_CATEGORY_NAMES as [string, ...string[]]),
      description: z.string().trim().min(10),
      employment_type: z.enum([...EMPLOYMENT_TYPES] as [string, ...string[]]),
      tags: z.array(z.string().trim().min(1)).max(5).optional(),
      company_logo_url: z.string().url().optional(),
    }),
  }),
};
