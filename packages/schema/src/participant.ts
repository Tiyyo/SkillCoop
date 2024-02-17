import * as z from "zod";

export const inviteParticipantSchema = z.object({
  event_id: z.number().int().positive(),
  ids: z.array(z.number()),
  initiator: z.number().optional()
});

export const updateParticipantSchema = z.object({
  event_id: z.number().int().positive(),
  profile_id: z.number().int().positive(),
  status_name: z.enum(["confirmed", "declined", "pending", "refused", "requested"])
});