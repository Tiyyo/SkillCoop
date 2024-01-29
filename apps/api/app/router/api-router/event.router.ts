import express, { Router } from 'express';
import {
  createEventSchema,
  updateEventSchema,
  updateOrganizerSchema,
} from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import eventController from '../../controllers/event.controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';

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

router.route('/user/:profileId').get(sanitizeParams, factory(getAllByUser));

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

router
  .route('/details/:eventId/:profileId')
  .get(sanitizeParams, factory(getOne));

router.route('/teams').post(factory(generateTeams));
router.route('/:id/:profileId').delete(sanitizeParams, factory(deleteOne));

export default router;
