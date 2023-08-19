import express, { Router } from 'express';
import factory from '../middleware/factory.controller';
import eventController from '../controller/event.controller';
import validate from '../middleware/schema.validator';
import createEvent from '../schemas/event/create.event';
import updateEvent from '../schemas/event/update.event';
import { canals } from '../@types/types';


const { getAll, getOne, createOne, updateOne, deleteOne } = eventController


const router: Router = express.Router();

router.route('/')
    .get(factory(getAll))
    .post(validate(createEvent, canals.body), factory(createOne))
    .patch(validate(updateEvent, canals.body), factory(updateOne))

router.route('/:id')
    .get(factory(getOne))

router.route('/:id/:profileId').delete(
    factory(deleteOne)
)


export default router;