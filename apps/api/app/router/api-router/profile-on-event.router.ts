import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import profileOnEventController from '../../controller/profile-on-event.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema'

const { updateParticipantSchema, inviteParticipantSchema } = schema
const { getAllUserByEvent, sendInvitationToEvent, updateStatus } = profileOnEventController;


const router: Router = express.Router();

router.route('/')
  .post(validate(inviteParticipantSchema, canals.body), factory(sendInvitationToEvent))
  .patch(validate(updateParticipantSchema, canals.body), factory(updateStatus))

router.route('/:event_id')
  .get(factory(getAllUserByEvent))


export default router;