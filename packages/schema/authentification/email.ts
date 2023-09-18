import * as z from 'zod';

const sendVerifEmailSchema = z.object({
  email: z.string().email(),
})

export default sendVerifEmailSchema