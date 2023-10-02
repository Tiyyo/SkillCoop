import * as z from "zod";

const inviteParticipantSchema = z.object({
  event_id: z.number(),
  profile_id: z.number(),
});

export default inviteParticipantSchema;