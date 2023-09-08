import express, { Router } from 'express';
import factory from '../../middleware/factory.controller';
import statusController from '../../controller/status.controller';

const { getAll, getOne, createOne, updateOne, deleteOne } = statusController;


const router: Router = express.Router();

router.route('/')
  .get(factory(getAll))
  .post(factory(createOne))

router.route('/:id')
  .get(factory(getOne))
  .patch(factory(updateOne))
  .delete(factory(deleteOne))


export default router;