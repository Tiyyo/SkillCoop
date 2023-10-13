import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import skillFootController from '../../controller/skill-foot.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema'
const { ownSkillSchema, participantSkillSchema } = schema


const { getProfileEvalByEvent, getProfileEval, createOwnRating, createRating } = skillFootController;

const router: Router = express.Router();

router.route('/')
  .post(validate(ownSkillSchema, canals.body), factory(createOwnRating))

router.route('/event')
  .post(validate(participantSkillSchema, canals.body), factory(createRating))
  .get(factory(getProfileEvalByEvent))

router.route('/:id')
  .get(factory(getProfileEval))



export default router;