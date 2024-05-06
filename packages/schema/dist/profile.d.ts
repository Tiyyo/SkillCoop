import * as z from 'zod';
export declare const editProfileInfosSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    first_name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    last_name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    date_of_birth: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    location: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    username?: string | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    date_of_birth?: string | null | undefined;
    location?: string | null | undefined;
}, {
    username?: string | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    date_of_birth?: string | null | undefined;
    location?: string | null | undefined;
}>;
export type EditProfileInfos = z.infer<typeof editProfileInfosSchema>;
