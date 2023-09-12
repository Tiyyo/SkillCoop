import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import profileOnEventController from '../../controller/profile-on-event.controller';
import validate from '../../middleware/schema-validator';
import profileOnEventSchema from '../../schemas/profile_on_event/profile.on.event';
import { canals } from '../../@types/types';

const { getAllUserByEvent, sendInvitationToEvent, updateStatus } = profileOnEventController;


const router: Router = express.Router();

router.route('/')
  .post(validate(profileOnEventSchema, canals.body), factory(sendInvitationToEvent))
  .patch(validate(profileOnEventSchema, canals.body), factory(updateStatus))

router.route('/:event_id')
  .get(factory(getAllUserByEvent))


export default router;