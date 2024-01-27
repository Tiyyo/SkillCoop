import express, { Router } from 'express';
import factory from '../../middlewares/wrapper-controller.js';
/* eslint-disable-next-line */
import {
  inviteParticipantSchema,
  updateParticipantSchema,
} from '@skillcoop/schema';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
/* eslint-disable-next-line */
import participantController from '../../controllers/profile-on-event.controller.js';

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
