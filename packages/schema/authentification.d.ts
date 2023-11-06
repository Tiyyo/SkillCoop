import * as z from 'zod';
import { ZodType } from 'zod';
export declare const emailSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
}, {
    email?: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export declare const passwordUpdateSchema: z.ZodEffects<z.ZodObject<{
    old_password: z.ZodString;
    new_password: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>, string, string>;
    confirm_new_password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    old_password?: string;
    new_password?: string;
    confirm_new_password?: string;
}, {
    old_password?: string;
    new_password?: string;
    confirm_new_password?: string;
}>, {
    old_password?: string;
    new_password?: string;
    confirm_new_password?: string;
}, {
    old_password?: string;
    new_password?: string;
    confirm_new_password?: string;
}>;
export declare const registerSchema: ZodType;
