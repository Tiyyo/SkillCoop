import * as z from "zod";

export const markAsReadNotificationSchema = z.object({
  notificationId: z.number().int().positive()
});
