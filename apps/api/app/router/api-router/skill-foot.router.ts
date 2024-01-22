import express, { Router } from 'express';
import factory from '#middlewares/wrapper-controller';
import skillFootController from '#controllers/skill-foot.controller';
import { validateSchema } from '#middlewares/schema-validator';
import { canals } from '#types/types';
import { ownSkillSchema, participantSkillSchema } from '@skillcoop/schema';
import { sanitizeParams } from '#middlewares/sanitizer.params';

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
