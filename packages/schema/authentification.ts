import * as z from 'zod';
import { ZodType } from 'zod';

export const emailSchema = z.object({
  email: z.string().email(),
})

export const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const passwordUpdateSchema = z.object({
  old_password: z.string(),
  new_password: z.string()
    .min(8, { message: "Must contains at least 8 characters" })
    .trim()
    .refine((value) => /\w*[a-z]\w*/.test(value), {
      message: "Must contain one lowercase",
    })
    .refine((value) => /\w*[A-Z]\w*/.test(value), {
      message: "Must contain one uppercase",
    })
    .refine((value) => /\d/.test(value), {
      message: "Must contain one number",
    })
    .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
      message: "Must containe one special character",
    }),
  confirm_new_password: z.string(),
}
).refine(data => data.new_password === data.confirm_new_password, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const registerSchema: ZodType = z
  .object({
    email: z.string().email({ message: "This is not an valid email" }),
    password: z
      .string()
      .min(8, { message: "Must contains at least 8 characters" })
      .trim()
      .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: "Must contain one lowercase",
      })
      .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: "Must contain one uppercase",
      })
      .refine((value) => /\d/.test(value), {
        message: "Must contain one number",
      })
      .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: "Must containe one special character",
      }),
    confirmedPassword: z.string(),
    termAndService: z.string().transform((value) => value === "on"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords don't match !",
    path: ["confirm"],
  });