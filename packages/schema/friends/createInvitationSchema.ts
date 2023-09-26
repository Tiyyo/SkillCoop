import * as z from 'zod';

const createInvitationSchema = z.object({
  adder_id: z.number(),
  friend_id: z.number(),
});

export default createInvitationSchema;