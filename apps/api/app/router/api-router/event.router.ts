import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import eventController from '../../controller/event.controller';
import validate from '../../middleware/schema-validator';
import schemas from 'schema';
import updateEvent from '../../schemas/event/update.event';
import { canals } from '../../@types/types';

const { createEventSchema } = schemas;

const {
  getOrganizerEvents,
  getOne,
  getPasts,
  getAllByUser,
  createOne,
  updateOne,
  deleteOne,
} = eventController;

const router: Router = express.Router();

router
  .route('/')
  .post(validate(createEventSchema, canals.body), factory(createOne))
  .patch(validate(updateEvent, canals.body), factory(updateOne));

router.route('/user/:id').get(factory(getAllByUser));

router.route('/organizer').get(factory(getOrganizerEvents));

router.route('/past').get(factory(getPasts))

router.route('/:id').get(factory(getOne));

router.route('/:id/:profileId').delete(factory(deleteOne));

export default router;
