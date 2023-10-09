import * as z from "zod";

const updateParticipantSchema = z.object({
  event_id: z.number(),
  profile_id: z.number(),
  status_name: z.enum(["confirmed", "declined"])
});

export default updateParticipantSchema;