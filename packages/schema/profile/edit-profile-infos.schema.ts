import * as z from 'zod';

const editProfileInfosSchema = z.object({
  username: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  location: z.string().optional(),
});

export default editProfileInfosSchema;