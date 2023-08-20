import { cacheOrGetCacheData } from '@/helpers/cache.data';
import { friendslist as Friendlist } from '../models/index';
import { Request, Response } from 'express'
import logger from '../helpers/logger';
import redis from 'ioredis'

export default {
    async getAll(req: Request, res: Response) {
        // get all friends , confirmed and pending
        const { id } = req.params;

        const friendlist = await Friendlist.findAllByPk(Number(id));

        res.status(200).json(friendlist);

    },
    async sendFriendRequest(req: Request, res: Response) {

        // create a new friend request
        // status send 
        // create a status for the added pending

        const { adder_id, friend_id } = req.body;

        const result = await Friendlist.sendRequest(adder_id, friend_id);

        res.json(result);

    },
    async acceptOrDeclined(req: Request, res: Response) {

        const { adder_id, friend_id, status_name } = req.body;

        const result = await Friendlist.updateStatus({ adder_id, friend_id, status_name });

        res.status(200).send(result);
    },
    async getRequestToAccept(req: Request, res: Response) {

        const { id } = req.params;
        // get friendship where id = friend_id and status = pending

        const pendingRequests = await Friendlist.findPendingRequests(Number(id));

        res.json(pendingRequests);
    },
    async getOne(req: Request, res: Response) {
        // get one friend by id and display his profile
    },
    async updateOne(req: Request, res: Response) {
        // confirm a friend request
    },
    async deleteOne(req: Request, res: Response) {
        // remove a friend from a friends list
    }
}