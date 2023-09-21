import { ZodError, AnyZodObject } from 'zod';
import registerSchema from './authentification/register';
import loginSchema from './authentification/login';
import sendVerifEmailSchema from './authentification/email';
import createEventSchema from './event/createEventSchema';

export type { AnyZodObject, ZodError }
export default {
  registerSchema,
  loginSchema,
  sendVerifEmailSchema,
  createEventSchema
}