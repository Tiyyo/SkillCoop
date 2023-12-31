import * as z from 'zod';
export declare const updateNotificationPreferenceSchema: z.ZodObject<{
    type_name: z.ZodEnum<["friend", "event", "system", "message"]>;
    user_id: z.ZodNumber;
    email: z.ZodOptional<z.ZodBoolean>;
    push: z.ZodOptional<z.ZodBoolean>;
    website: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    user_id: number;
    type_name: "message" | "friend" | "event" | "system";
    email?: boolean | undefined;
    push?: boolean | undefined;
    website?: boolean | undefined;
}, {
    user_id: number;
    type_name: "message" | "friend" | "event" | "system";
    email?: boolean | undefined;
    push?: boolean | undefined;
    website?: boolean | undefined;
}>;
export declare const updateLanguagePreferenceSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    name: z.ZodEnum<["en", "fr", "es"]>;
}, "strip", z.ZodTypeAny, {
    user_id: number;
    name: "en" | "fr" | "es";
}, {
    user_id: number;
    name: "en" | "fr" | "es";
}>;
export declare const updateThemePreferenceSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    name: z.ZodEnum<["dark", "light"]>;
}, "strip", z.ZodTypeAny, {
    user_id: number;
    name: "dark" | "light";
}, {
    user_id: number;
    name: "dark" | "light";
}>;
