import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
// participant controller
// had to use pC because of the length line restriction
import pC from '../../controller/profile-on-event.controller';
import { validateSchema } from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { inviteParticipantSchema, updateParticipantSchema } from 'schema';

const { sendInvitationToEvent, updateStatus } = pC;

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
