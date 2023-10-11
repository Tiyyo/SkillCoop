import * as z from "zod";

const updateParticipantSchema = z.object({
  event_id: z.number().int().positive(),
  profile_id: z.number().int().positive(),
  status_name: z.enum(["confirmed", "declined"])
});

export default updateParticipantSchema;