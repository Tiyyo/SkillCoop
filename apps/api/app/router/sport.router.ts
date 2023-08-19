import express, { Router } from 'express';
import factory from '../middleware/factory.controller';
import sportController from '../controller/sport.controller';

const { getAll, getOne, createOne } = sportController;


const router: Router = express.Router();

router.route('/')
    .get(factory(getAll))
    .post(factory(createOne))

router.route('/:id')
    .get(factory(getOne))


export default router;