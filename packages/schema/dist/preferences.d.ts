import * as z from 'zod';
export declare const updateNotificationPreferenceSchema: z.ZodObject<{
    type_name: z.ZodEnum<["friend", "event", "system", "message"]>;
    user_id: z.ZodString;
    email: z.ZodOptional<z.ZodBoolean>;
    push: z.ZodOptional<z.ZodBoolean>;
    website: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    type_name: "message" | "friend" | "event" | "system";
    email?: boolean | undefined;
    push?: boolean | undefined;
    website?: boolean | undefined;
}, {
    user_id: string;
    type_name: "message" | "friend" | "event" | "system";
    email?: boolean | undefined;
    push?: boolean | undefined;
    website?: boolean | undefined;
}>;
export declare const updateLanguagePreferenceSchema: z.ZodObject<{
    user_id: z.ZodString;
    name: z.ZodEnum<["en", "fr", "es"]>;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    name: "en" | "fr" | "es";
}, {
    user_id: string;
    name: "en" | "fr" | "es";
}>;
export declare const updateThemePreferenceSchema: z.ZodObject<{
    user_id: z.ZodString;
    name: z.ZodEnum<["dark", "light"]>;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    name: "dark" | "light";
}, {
    user_id: string;
    name: "dark" | "light";
}>;
