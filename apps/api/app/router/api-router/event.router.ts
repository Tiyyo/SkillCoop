import express, { Router } from 'express';
import factory from '../../middlewares/wrapper-controller.js';
import { getOrganizerEvents } from '../../controllers/event/get-organize.js';
import { getOne } from '../../controllers/event/get-one.js';
import { getPasts } from '../../controllers/event/get-pasts.js';
import { getAllByUser } from '../../controllers/event/get-all-userid.js';
import { getUpcoming } from '../../controllers/event/get-upcoming.js';
/*eslint-disable */
import { getLastSharedEvents } from '../../controllers/event/get-last-shared.js';
import { getEventsByProximity } from '../../controllers/event/get-by-proximity.js';
/*eslint-enable */
import { createOne } from '../../controllers/event/create-one.js';
import { generateTeams } from '../../controllers/event/generate-teams.js';
import { updateOne } from '../../controllers/event/update-one.js';
import { updateOrganizer } from '../../controllers/event/update-organizer.js';
import { deleteOne } from '../../controllers/event/delete-one.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';
import {
  createEventSchema,
  getEventNearbySchema,
  updateEventSchema,
  updateOrganizerSchema,
} from '@skillcoop/schema';

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

router
  .route('/shared/:profileId/:friendId')
  .get(sanitizeParams, factory(getLastSharedEvents));

router.route('/teams').post(factory(generateTeams));
router.route('/:id/:profileId').delete(sanitizeParams, factory(deleteOne));

router
  .route('/near')
  .get(
    validateSchema(getEventNearbySchema, canals.query),
    factory(getEventsByProximity),
  );

export default router;
