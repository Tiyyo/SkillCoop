import * as z from 'zod';
import { ZodType } from 'zod';

export const emailSchema = z.object({
  email: z.string().email(),
});

export const updateEmailSchema = z.object({
  email: z.string().email({ message: 'thisIsNotValidEmail' }),
  user_id: z.number().positive().int(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const passwordUpdateSchema = z
  .object({
    old_password: z.string(),
    new_password: z
      .string()
      .min(8, { message: 'mustContains8Characters' })
      .max(64, { message: 'mustContainsMost64Characters' })
      .trim()
      .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: 'mustContainsAtLeastOneLowercase',
      })
      .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: 'mustContainsAtLeastOneUppercase',
      })
      .refine((value) => /\d/.test(value), {
        message: 'mustContainsAtLeastOneNumber',
      })
      .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: 'mustContainsAtLeastOneSpecialCharacter',
      }),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.old_password !== data.new_password, {
    message: 'newPasswordDifferentFromOldPassword',
    path: ['old_password'],
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'passwordDontMatch',
    path: ['confirm_new_password'],
  });

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'mustContains8Characters' })
    .max(64, { message: 'mustContainsMost64Characters' })
    .trim()
    .refine((value) => /\w*[a-z]\w*/.test(value), {
      message: 'mustContainsAtLeastOneLowercase',
    })
    .refine((value) => /\w*[A-Z]\w*/.test(value), {
      message: 'mustContainsAtLeastOneUppercase',
    })
    .refine((value) => /\d/.test(value), {
      message: 'mustContainsAtLeastOneNumber',
    })
    .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
      message: 'mustContainsAtLeastOneSpecialCharacter',
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'passwordDontMatch',
  path: ['confirmPassword'],
});


export const registerSchema: ZodType = z
  .object({
    email: z.string().email({ message: 'thisIsNotValidEmail' }),
    password: z
      .string()
      .min(8, { message: 'mustContains8Characters' })
      .max(64, { message: 'mustContainsMost64Characters' })
      .trim()
      .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: 'mustContainsAtLeastOneLowercase',
      })
      .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: 'mustContainsAtLeastOneUppercase',
      })
      .refine((value) => /\d/.test(value), {
        message: 'mustContainsAtLeastOneNumber',
      })
      .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: 'mustContainsAtLeastOneSpecialCharacter',
      }),
    confirmedPassword: z.string(),
    termAndService: z.string().transform((value) => value === 'on'),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "passwordDontMatch",
    path: ['confirm'],
  });
