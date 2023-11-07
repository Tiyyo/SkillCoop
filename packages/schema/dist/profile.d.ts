import * as z from 'zod';
export declare const editProfileInfosSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    first_name: z.ZodOptional<z.ZodString>;
    last_name: z.ZodOptional<z.ZodString>;
    date_of_birth: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username?: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    location?: string;
}, {
    username?: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    location?: string;
}>;
