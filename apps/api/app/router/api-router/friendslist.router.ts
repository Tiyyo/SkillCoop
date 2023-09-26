import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import friendsList from '../../controller/friendslist.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema'
const { searchFriendsSchema, createInvitationSchema, updateFriendshipSchema } = schema

const { getFriends, sendFriendRequest, getRequestToAccept, acceptOrDeclined, searchFriends } = friendsList;


const router: Router = express.Router();

router.route('/')
  .post(validate(createInvitationSchema, canals.body), factory(sendFriendRequest))
  .patch(validate(updateFriendshipSchema, canals.body), factory(acceptOrDeclined))

router.route('/:id')
  .get(factory(getFriends))

router.route('/search/friendlist')
  .get(validate(searchFriendsSchema, canals.query), factory(searchFriends))

router.route('/pending/:id')
  .get(factory(getRequestToAccept))


export default router;