import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import friendsList from '../../controller/friendslist.controller';
import validate from '../../middleware/schema-validator';
import firendlistSchema from '../../schemas/profile_on_profile/profile.on.profile';
import { canals } from '../../@types/types';

const { getAll, sendFriendRequest, getRequestToAccept, acceptOrDeclined } = friendsList;


const router: Router = express.Router();

router.route('/')
  // .get(factory(getAll))
  .post(validate(firendlistSchema, canals.body), factory(sendFriendRequest))
  .patch(validate(firendlistSchema, canals.body), factory(acceptOrDeclined))

router.route('/:id')
  .get(factory(getAll))

router.route('/pending/:id')
  .get(factory(getRequestToAccept))


export default router;