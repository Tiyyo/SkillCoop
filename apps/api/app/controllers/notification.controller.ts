import { Request, Response } from 'express';
import checkParams from '../utils/check-params.js';
import { notification as Notification } from '../models/index.js';

export default {
  async getNotification(req: Request, res: Response) {
    const [profileId] = checkParams(req.params.profileId);
    const notifications = await Notification.getLast(profileId);

    return res.status(200).json(notifications);
  },
  async markAsRead(req: Request, res: Response) {
    const { notificationId } = req.body;

    const isUpdated = await Notification.updateOne(
      { id: notificationId },
      {
        is_read: 1,
      },
    );

    return res.status(200).json({ succes: isUpdated });
  },
};
