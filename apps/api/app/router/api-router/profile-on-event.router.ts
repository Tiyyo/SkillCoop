import express, { Router } from 'express';
import factory from '#middlewares/wrapper-controller';
/* eslint-disable-next-line */
import participantController from '#controllers/profile-on-event.controller';
import { validateSchema } from '#middlewares/schema-validator';
import { canals } from '#types/types';
import {
  inviteParticipantSchema,
  updateParticipantSchema,
} from '@skillcoop/schema';

const { sendInvitationToEvent, updateStatus } = participantController;

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
