import * as z from 'zod';

export const updateNotificationPreferenceSchema = z.object({
  type_name: z.enum(['friend', 'event', 'system', 'message']),
  user_id: z.string().uuid(),
  email: z.boolean().optional(),
  push: z.boolean().optional(),
  website: z.boolean().optional(),
});



export const updateLanguagePreferenceSchema = z.object({
  user_id: z.string().uuid(),
  name: z.enum(['en', 'fr', 'es']),
})

export const updateThemePreferenceSchema = z.object({
  user_id: z.string().uuid(),
  name: z.enum(['dark', 'light']),
})