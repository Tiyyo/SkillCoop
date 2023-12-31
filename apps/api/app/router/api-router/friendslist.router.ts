import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import friendsList from '../../controller/friendslist.controller';
import { validateSchema } from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import {
  searchFriendsSchema,
  createInvitationSchema,
  updateFriendshipSchema,
} from '@skillcoop/schema';

const {
  getFriends,
  sendFriendRequest,
  getRequestToAccept,
  acceptOrDeclined,
  searchFriends,
  getSuggestProfile,
} = friendsList;

const router: Router = express.Router();

router
  .route('/')
  .post(
    validateSchema(createInvitationSchema, canals.body),
    factory(sendFriendRequest),
  )
  .patch(
    validateSchema(updateFriendshipSchema, canals.body),
    factory(acceptOrDeclined),
  );

router.route('/:profileId').get(factory(getFriends));

router.route('/suggest/:profileId').get(factory(getSuggestProfile));

//query routes
router
  .route('/search/friendlist')
  .get(
    validateSchema(searchFriendsSchema, canals.query),
    factory(searchFriends),
  );

router.route('/pending/:profileId').get(factory(getRequestToAccept));

export default router;
