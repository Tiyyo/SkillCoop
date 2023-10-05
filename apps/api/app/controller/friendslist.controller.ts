import { friendslist as Friendlist } from '../models/index';
import { Request, Response } from 'express'
import logger from '../helpers/logger';
import redis from 'ioredis'
import checkParams from '../utils/check-params';
import ServerError from '../helpers/errors/server.error';

export default {
  async getFriends(req: Request, res: Response) {
    // get all friend
    const id = checkParams(req.params.id);

    const friendlist = await Friendlist.findAllByPk(id);

    res.status(200).json(friendlist);
  },
  async sendFriendRequest(req: Request, res: Response) {

    // create a new friend request
    // status send 
    // create a status for the added pending
    const { adder_id, friend_id } = req.body;

    console.log(adder_id, friend_id);

    await Friendlist.sendRequest(adder_id, friend_id);

    console.log('is Success send request');

    res.status(200);

  },
  async acceptOrDeclined(req: Request, res: Response) {

    const { adder_id, friend_id, status_name } = req.body;
    //friend_id is the id of the user who receive invitation and send the update request
    const isExist = await Friendlist.findOne(adder_id, friend_id, 'pending');

    if (!isExist) throw new ServerError('friend request not found');

    const result = await Friendlist.updateStatus({ adder_id, friend_id, status_name });

    res.status(200).send(result);
  },
  async getRequestToAccept(req: Request, res: Response) {
    const id = checkParams(req.params.id);
    // get friendship where id = friend_id and status = pending

    const pendingRequests = await Friendlist.findPendingRequests(id);

    res.json(pendingRequests);
  },
  async searchFriends(req: Request, res: Response) {
    const { username, profile, page } = req.query

    const friends = await Friendlist.findFriendByUsernameInUserFriendlist(Number(profile), username, Number(page));

    res.json(friends);
  },

}