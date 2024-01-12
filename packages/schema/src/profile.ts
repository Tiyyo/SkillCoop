import * as z from 'zod';

export const editProfileInfosSchema = z.object({
  username: z.string().max(16, { message: '16 characters or less allowed' }).optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
});
