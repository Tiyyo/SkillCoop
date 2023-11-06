import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import skillFootController from '../../controller/skill-foot.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { ownSkillSchema, participantSkillSchema } from 'schema';

const { getProfileEvalByEvent, getProfileEval, createOwnRating, createRating } =
  skillFootController;

const router: Router = express.Router();

router
  .route('/')
  .post(validate(ownSkillSchema, canals.body), factory(createOwnRating));

router
  .route('/event')
  .post(validate(participantSkillSchema, canals.body), factory(createRating))
  // query routes
  .get(factory(getProfileEvalByEvent));

router.route('/:profileId').get(factory(getProfileEval));

export default router;
