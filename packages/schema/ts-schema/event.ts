import * as z from "zod";

export const createEventSchema = z.object({
  // TODO make a custom regex for the date in string format
  date: z.string(),
  duration: z.number(),
  location: z.string(),
  required_participants: z.number(),
  organizer_id: z.number().int().positive(),
  status_name: z.enum(["open", "full"]).optional(),
  participants: z.array(z.number()).optional(),
});

export const updateEventSchema = z.object({
  // TODO make a custom regex for the date in string format
  date: z.string().optional(),
  duration: z.number().optional(),
  location: z.string().optional(),
  required_participants: z.number().optional(),
  profile_id: z.number().int().positive(),
  status_name: z.enum(["open", "full", "cancelled", "completed"]).optional(),
  participants: z.array(z.number()).optional(),
});

export const updateOrganizerSchema = z.object({
  event_id: z.number().int().positive(),
  organizer_id: z.number().int().positive(),
  new_organizer_id: z.number().int().positive(),
});
