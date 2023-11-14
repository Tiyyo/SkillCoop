import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import mvpController from '../../controller/mvp.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { voteSchema } from 'schema';

const { createOne } = mvpController;

const router: Router = express.Router();

router.route('/').post(validate(voteSchema, canals.body), factory(createOne));

export default router;
