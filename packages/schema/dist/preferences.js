"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateThemePreferenceSchema = exports.updateLanguagePreferenceSchema = exports.updateNotificationPreferenceSchema = void 0;
const z = require("zod");
exports.updateNotificationPreferenceSchema = z.object({
    type_name: z.enum(['friend', 'event', 'system', 'message']),
    user_id: z.number().positive().int(),
    email: z.boolean().optional(),
    push: z.boolean().optional(),
    website: z.boolean().optional(),
});
exports.updateLanguagePreferenceSchema = z.object({
    user_id: z.number().positive().int(),
    name: z.enum(['en', 'fr', 'es']),
});
exports.updateThemePreferenceSchema = z.object({
    user_id: z.number().positive().int(),
    name: z.enum(['dark', 'light']),
});
