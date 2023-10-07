import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import skillFootController from '../../controller/skill-foot.controller';
import validate from '../../middleware/schema-validator';
import skillFootSchema from '../../schemas/skill_foot/skillFoot';
import { canals } from '../../@types/types';
import schema from 'schema'
const { ownSkillSchema } = schema


const { getOne, createOne } = skillFootController;


const router: Router = express.Router();

router.route('/')
  .post(validate(ownSkillSchema, canals.body), factory(createOne))

router.route('/:id')
  .get(factory(getOne))

export default router;