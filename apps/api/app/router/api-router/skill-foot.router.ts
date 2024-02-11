import express, { Router } from 'express';
import { ownSkillSchema, participantSkillSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';
import { getProfileEval } from '../../controllers/skill/get-eval.js';
import { createOwnRating } from '../../controllers/skill/create-own-rating.js';
import { createRating } from '../../controllers/skill/create-rating.js';
/*eslint-disable */
import { getProfileEvalByEvent } from '../../controllers/skill/get-profile-eval-event.js';
/*eslint-enable */

const router: Router = express.Router();

router
  .route('/')
  .post(validateSchema(ownSkillSchema, canals.body), factory(createOwnRating));

router
  .route('/event')
  .post(
    validateSchema(participantSkillSchema, canals.body),
    factory(createRating),
  )
  // query routes
  .get(factory(getProfileEvalByEvent));

router.route('/:profileId').get(sanitizeParams, factory(getProfileEval));

export default router;
