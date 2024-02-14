import { Request, Response } from 'express';
import { profileOnProfile as ProfileOnProfile } from '../../models/index.js';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import ServerError from '../../helpers/errors/server.error.js';
//eslint-disable-next-line
import { notifyUserHasBeenAddedToFriendlist } from '../../services/notification/subtype/added-friendlist.js';

export async function acceptOrDeclined(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const { adder_id, friend_id, status_name, username } = req.body;
  //friend_id is the id of the user who receive invitation
  //and send the update request
  const isExist = await ProfileOnProfile.find(adder_id, friend_id, 'pending');

  if (!isExist) throw new ServerError('friend request not found');

  const result = await ProfileOnProfile.updateStatus({
    adder_id,
    friend_id,
    status_name,
  });

  if (status_name === 'confirmed' && result) {
    // adder is the user who will receive the notification
    // friend_id is the instigator of the response
    notifyUserHasBeenAddedToFriendlist(friend_id, adder_id);
  }

  res.status(200).json({ success: result, username, status: status_name });
}
