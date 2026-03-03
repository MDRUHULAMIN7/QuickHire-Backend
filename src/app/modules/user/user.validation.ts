import z from "zod";
import { UserStatus } from "./user.constant.js";


const userValidationSchema = z.object({
    password:z.string().min(6,{message:'Password can not be less than 6 characters'}).max(20,{message:'Password can not be more than 20 characters'}).optional(),
})
const updateProfileValidationSchema = z.object({
  body: z
    .object({
      name: z.string().min(1).max(60).optional(),
      avatarUrl: z.string().url().optional(),
    })
    .refine((data) => data.name || data.avatarUrl, {
      message: "At least one field is required",
    }),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  updateProfileValidationSchema,
  changeStatusValidationSchema,
};
