import { z } from "zod";

export const JobValidation = {
  create: z.object({
    body: z.object({
      title: z.string().trim().min(2).max(100),
      company: z.string().trim().min(2).max(100),
      location: z.string().trim().min(2).max(100),
      category: z.string().trim().min(2).max(100),
      description: z.string().trim().min(10),
    }),
  }),
};
