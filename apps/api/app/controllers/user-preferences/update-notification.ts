import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
/*eslint-disable */
import { notificationPreference as NotificationPreference } from '../../models/index.js';
/*eslint-enable */

export async function updateNotification(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const updateObject = req.body;
  const isUpdated = await NotificationPreference.updatePreference(updateObject);

  res.status(200).json({ success: isUpdated });
}
