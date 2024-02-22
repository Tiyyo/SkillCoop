import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { notification as Notification } from '../../models/index.js';
//Migrated
export async function getNotification(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);
  const notifications = await Notification.getLast(profileId);

  return res.status(200).json(notifications);
}
