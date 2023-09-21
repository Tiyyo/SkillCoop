import * as z from "zod";

const createEventSchema = z.object({
  // TODO make a custom regex for the date in string format
  date: z.string(),
  duration: z.number(),
  location: z.string(),
  required_participants: z.number(),
  organizer_id: z.number(),
  status: z.enum(["open", "full"]).optional(),
});

export default createEventSchema;