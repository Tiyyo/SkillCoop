import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import scoreController from '../../controller/score.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema'
const { saveScoreSchema } = schema

const { createOne } = scoreController;

const router: Router = express.Router();

router.route('/')
  .post(validate(saveScoreSchema, canals.body), factory(createOne))

export default router;