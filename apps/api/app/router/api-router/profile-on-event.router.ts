import express, { Router } from 'express';
import factory from '../../middlewares/wrapper-controller.js';
import {
  inviteParticipantSchema,
  updateParticipantSchema,
} from '@skillcoop/schema';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
/* eslint-disable */
import { sendInvitationToEvent } from '../../controllers/profile-on-event/send-invitations.js';
import { updateStatus } from '../../controllers/profile-on-event/update-status.js';
/* eslint-enable */

const router: Router = express.Router();

router
  .route('/')
  .post(
    validateSchema(inviteParticipantSchema, canals.body),
    factory(sendInvitationToEvent),
  )
  .patch(
    validateSchema(updateParticipantSchema, canals.body),
    factory(updateStatus),
  );

export default router;
