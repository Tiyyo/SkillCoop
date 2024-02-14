import { Request, Response } from 'express';
import { profileOnProfile as ProfileOnProfile } from '../../models/index.js';
import deleteDecodedKey from '../../utils/delete-decoded.js';
//eslint-disable-next-line
import { notifyUserReceivedFriendRequest } from '../../services/notification/subtype/friend-request.js';

export async function sendFriendRequest(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  // create a new friend request
  // status send
  // create a status for the added pending
  const { adder_id, friend_id } = req.body;
  const isSent = await ProfileOnProfile.sendRequest(adder_id, friend_id);
  if (isSent) {
    await notifyUserReceivedFriendRequest(adder_id, friend_id);
  }

  res.status(201).json({ success: isSent });
}
