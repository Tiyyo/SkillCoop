import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import mvpController from '../../controller/mvp.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema'
const { voteSchema } = schema

const { createOne } = mvpController;


const router: Router = express.Router();

router.route('/')
  .post(validate(voteSchema, canals.body), factory(createOne))


export default router;