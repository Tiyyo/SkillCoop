import { friendslist as Friendlist } from '../models/index';
import { Request, Response } from 'express';
import checkParams from '../utils/check-params';
import ServerError from '../helpers/errors/server.error';
import deleteDecodedKey from '../utils/delete-decoded';
import UserInputError from '../helpers/errors/user-input.error';

export default {
  async getFriends(req: Request, res: Response) {
    // get all friend
    const [id] = checkParams(req.params.profileId);
    const friendlist = await Friendlist.findAllByPk(id);

    res.status(200).json(friendlist);
  },
  async sendFriendRequest(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    // create a new friend request
    // status send
    // create a status for the added pending
    const { adder_id, friend_id } = req.body;
    const isSent = await Friendlist.sendRequest(adder_id, friend_id);

    res.status(201).json({ success: isSent });
  },
  async acceptOrDeclined(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { adder_id, friend_id, status_name } = req.body;
    //friend_id is the id of the user who receive invitation
    //and send the update request
    const isExist = await Friendlist.findOne(adder_id, friend_id, 'pending');

    if (!isExist) throw new ServerError('friend request not found');

    const result = await Friendlist.updateStatus({
      adder_id,
      friend_id,
      status_name,
    });

    res.status(200).json({ success: result });
  },
  async getRequestToAccept(req: Request, res: Response) {
    const [profileId] = checkParams(req.params.profileId);
    // get friendship where id = friend_id and status = pending
    const pendingRequests = await Friendlist.findPendingRequests(profileId);

    res.status(200).json(pendingRequests);
  },
  async searchFriends(req: Request, res: Response) {
    const { username, profile, page } = req.query;
    if (!username || typeof username !== 'string')
      throw new UserInputError('Username is not a string or is undefined');
    const friends = await Friendlist.findFriendByUsernameInUserFriendlist(
      Number(profile),
      username,
      Number(page),
    );

    res.status(200).json(friends);
  },
  async getSuggestProfile(req: Request, res: Response) {
    const [profileId] = checkParams(req.params.profileId);
    const suggestProfiles = await Friendlist.findSuggestProfile(profileId);

    res.status(200).json(suggestProfiles);
  },
};
