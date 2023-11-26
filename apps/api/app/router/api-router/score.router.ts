import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import scoreController from '../../controller/score.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { saveScoreSchema } from 'schema';

const { createOne } = scoreController;

const router: Router = express.Router();

router.route('/').post(validate(saveScoreSchema, canals.body), factory(createOne));

export default router;
