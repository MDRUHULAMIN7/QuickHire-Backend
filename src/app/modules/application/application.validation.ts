import { z } from "zod";

export const ApplicationValidation = {
  create: z.object({
    body: z.object({
      job: z.string().min(1),
      name: z.string().trim().min(1),
      email: z.string().email(),
      resumeLink: z.string().url().regex(/^https?:\/\//, 'Please enter a valid URL starting with http/https'),
      coverNote: z.string().min(50, { message: 'Cover note must be at least 50 characters' }),
    }),
  }),
  changeStatus: z.object({
    body: z.object({
      status: z.enum(['pending', 'reviewed', 'shortlisted', 'rejected']),
    }),
  }),
};
