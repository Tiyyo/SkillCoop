import express, { Router } from 'express';
import {
  searchFriendsSchema,
  createInvitationSchema,
  updateFriendshipSchema,
} from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';
/* eslint-disable */
import { searchFriends } from '../../controllers/profile-on-profile/search.js';
import { acceptOrDeclined } from '../../controllers/profile-on-profile/accept-or-declined.js';
import { getRequestToAccept } from '../../controllers/profile-on-profile/get-pending-request.js';
import { sendFriendRequest } from '../../controllers/profile-on-profile/send-request.js';
import { getFriends } from '../../controllers/profile-on-profile/get-friends.js';
import { getSuggestProfile } from '../../controllers/profile-on-profile/get-suggestion.js';
/* eslint-enable */

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
