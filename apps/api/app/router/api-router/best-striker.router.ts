import express, { Router } from 'express';
import factory from '../../middleware/wrapper-controller';
import bestStrikerController from '../../controller/best-striker.controller';
import validate from '../../middleware/schema-validator';
import { canals } from '../../@types/types';
import { voteSchema } from 'schema';

const { createOne } = bestStrikerController;


const router: Router = express.Router();

// Invalidate event id 
router.route('/')
  .post(validate(voteSchema, canals.body), factory(createOne));


export default router;