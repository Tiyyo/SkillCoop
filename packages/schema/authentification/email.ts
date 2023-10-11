import * as z from 'zod';

const emailSchema = z.object({
  email: z.string().email(),
})

export default emailSchema