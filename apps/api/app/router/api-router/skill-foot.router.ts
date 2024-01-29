import express, { Router } from 'express';
import { ownSkillSchema, participantSkillSchema } from '@skillcoop/schema';
import factory from '../../middlewares/wrapper-controller.js';
import skillFootController from '../../controllers/skill-foot.controller.js';
import { validateSchema } from '../../middlewares/schema-validator.js';
import { canals } from '../../@types/types.js';
import { sanitizeParams } from '../../middlewares/sanitizer.params.js';

const { getProfileEvalByEvent, getProfileEval, createOwnRating, createRating } =
  skillFootController;

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
