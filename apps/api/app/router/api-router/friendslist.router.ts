import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import friendsList from '../../controller/friendslist.controller.js';
import { validateSchema } from '../../middleware/schema-validator.js';
import { canals } from '../../@types/types.js';
import {
  searchFriendsSchema,
  createInvitationSchema,
  updateFriendshipSchema,
} from '@skillcoop/schema';
import { sanitizeParams } from '../../middleware/sanitizer.params.js';

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

router.route('/:profileId').get(sanitizeParams, factory(getFriends));

router
  .route('/suggest/:profileId')
  .get(sanitizeParams, factory(getSuggestProfile));

//query routes
router
  .route('/search/friendlist')
  .get(
    validateSchema(searchFriendsSchema, canals.query),
    factory(searchFriends),
  );

router
  .route('/pending/:profileId')
  .get(sanitizeParams, factory(getRequestToAccept));

export default router;
