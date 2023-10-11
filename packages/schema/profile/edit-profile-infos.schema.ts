import * as z from 'zod';

const editProfileInfosSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters long' }).optional(),
  first_name: z.string().min(2, { message: 'First name must be at least 2 characters long' }).optional(),
  last_name: z.string().min(2, { message: 'Last name must be at least 2 characters long' }).optional(),
  date_of_birth: z.string().min(10, { message: 'Date of birth must be at least 8 characters long' }).optional(),
  location: z.string().min(2, { message: 'Location must be at least 2 characters long' }).optional(),
});

export default editProfileInfosSchema;