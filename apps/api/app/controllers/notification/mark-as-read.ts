import { Request, Response } from 'express';
import { notification as Notification } from '../../models/index.js';

export async function markAsRead(req: Request, res: Response) {
  const { notificationId } = req.body;

  const isUpdated = await Notification.updateOne(
    { id: notificationId },
    {
      is_read: 1,
    },
  );

  return res.status(200).json({ succes: isUpdated });
}
