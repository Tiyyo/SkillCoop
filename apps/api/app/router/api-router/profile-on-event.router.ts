import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
// participant controller
// had to use pC because of the length line restriction
import pC from '../../controller/profile-on-event.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { inviteParticipantSchema, updateParticipantSchema } from 'schema';

const { sendInvitationToEvent, updateStatus } = pC;

const router: Router = express.Router();

router
  .route('/')
  .post(validate(inviteParticipantSchema, canals.body), factory(sendInvitationToEvent))
  .patch(validate(updateParticipantSchema, canals.body), factory(updateStatus));

export default router;
