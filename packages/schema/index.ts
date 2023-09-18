import { ZodError, AnyZodObject } from 'zod';
import registerSchema from './authentification/register';
import loginSchema from './authentification/login';
import sendVerifEmailSchema from './authentification/email';

export type { AnyZodObject, ZodError }
export default {
  registerSchema,
  loginSchema,
  sendVerifEmailSchema
}