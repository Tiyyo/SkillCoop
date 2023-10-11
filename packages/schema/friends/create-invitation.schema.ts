import * as z from 'zod';

const createInvitationSchema = z.object({
  adder_id: z.number().int().positive(),
  friend_id: z.number().int().positive(),
});

export default createInvitationSchema;