import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import bestStrikerController from '../../controller/best-striker.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import schema from 'schema'
const { voteSchema } = schema

const { createOne } = bestStrikerController;


const router: Router = express.Router();

router.route('/')
  .post(validate(voteSchema, canals.body), factory(createOne))


export default router;