import * as z from "zod";

const createEventSchema = z.object({
  // TODO make a custom regex for the date in string format
  date: z.string(),
  duration: z.number(),
  location: z.string(),
  required_participants: z.number(),
  organizer_id: z.number(),
  status_name: z.enum(["open", "full"]).optional(),
  participants: z.array(z.number()).optional(),
});

export default createEventSchema;