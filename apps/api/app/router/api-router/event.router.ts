import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import eventController from '../../controller/event.controller';
import { validateSchema } from '../../middleware/schema-validator';
import {
  createEventSchema,
  updateEventSchema,
  updateOrganizerSchema,
} from 'schema';
import { canals } from '../../@types/types';

const {
  getOrganizerEvents,
  getOne,
  getPasts,
  getAllByUser,
  getUpcoming,
  createOne,
  generateTeams,
  updateOne,
  updateOrganizer,
  deleteOne,
} = eventController;

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(createEventSchema, canals.body), factory(createOne))
  .patch(validateSchema(updateEventSchema, canals.body), factory(updateOne));

router.route('/user/:profileId').get(factory(getAllByUser));

// query routes
router
  .route('/organizer')
  .get(factory(getOrganizerEvents))
  .patch(
    validateSchema(updateOrganizerSchema, canals.body),
    factory(updateOrganizer),
  );
router.route('/past').get(factory(getPasts));
router.route('/upcoming').get(factory(getUpcoming));

router.route('/details/:eventId/:profileId').get(factory(getOne));
router.route('/teams').post(factory(generateTeams));
router.route('/:id/:profileId').delete(factory(deleteOne));

export default router;
