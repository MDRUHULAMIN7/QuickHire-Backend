import { z } from "zod";

export const ApplicationValidation = {
  create: z.object({
    body: z.object({
      job: z.string().min(1),
      name: z.string().min(1),
      email: z.string().email(),
      resume_link: z.string().url(),
      cover_note: z.string().optional(),
    }),
  }),
};
