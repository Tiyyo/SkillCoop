import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller.js';
import skillFootController from '../../controller/skill-foot.controller.js';
import { validateSchema } from '../../middleware/schema-validator.js';
import { canals } from '../../@types/types.js';
import { ownSkillSchema, participantSkillSchema } from '@skillcoop/schema';

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

router.route('/:profileId').get(factory(getProfileEval));

export default router;
