import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import eventController from '../../controller/event.controller';
import validate from '../../middleware/schema-validator';
import { createEventSchema, updateEventSchema, updateOrganizerSchema } from 'schema';
import { canals } from '../../@types/types';

const {
  getOrganizerEvents,
  getOne,
  getPasts,
  getAllByUser,
  createOne,
  generateTeams,
  updateOne,
  updateOrganizer,
  deleteOne,
} = eventController;

const router: Router = express.Router();

router
  .route('/')
  .post(validate(createEventSchema, canals.body), factory(createOne))
  .patch(validate(updateEventSchema, canals.body), factory(updateOne));

router.route('/user/:profileId').get(factory(getAllByUser));

// query routes
router
  .route('/organizer')
  .get(factory(getOrganizerEvents))
  .patch(validate(updateOrganizerSchema, canals.body), factory(updateOrganizer));

// query routes
router.route('/past').get(factory(getPasts));

router.route('/details/:eventId/:profileId').get(factory(getOne));

router.route('/teams').post(factory(generateTeams));

router.route('/:id/:profileId').delete(factory(deleteOne));

export default router;
