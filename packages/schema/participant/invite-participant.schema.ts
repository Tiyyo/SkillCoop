import * as z from "zod";

const inviteParticipantSchema = z.object({
  event_id: z.number(),
  ids: z.array(z.number()),
});

export default inviteParticipantSchema;