import * as z from "zod";

export const inviteParticipantSchema = z.object({
  event_id: z.number().int().positive(),
  ids: z.array(z.string()),
  initiator: z.string()
});

export const updateParticipantSchema = z.object({
  event_id: z.number().int().positive(),
  profile_id: z.string(),
  status_name: z.enum(["confirmed", "declined", "pending", "refused", "requested"])
});