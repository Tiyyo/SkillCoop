import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import profileOnEventController
  from '../../controller/profile-on-event.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { updateParticipantSchema, inviteParticipantSchema } from 'schema';

const { sendInvitationToEvent, updateStatus } =
  profileOnEventController;

const router: Router = express.Router();

router
  .route('/')
  .post(
    validate(inviteParticipantSchema, canals.body),
    factory(sendInvitationToEvent),
  )
  .patch(validate(updateParticipantSchema, canals.body), factory(updateStatus));


export default router;
