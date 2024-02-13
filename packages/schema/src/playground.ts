import * as z from "zod";

export const playgroundSchema = z.object({
  name: z.string().min(3).max(255),
  address: z.string().min(3).max(255),
  post_code: z.string(),
  city: z.string().min(3).max(255),
  region: z.string().min(3).max(255),
  country: z.string().min(3).max(255),
  longitude: z.number(),
  latitude: z.number(),
});