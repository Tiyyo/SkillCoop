import express, { Router } from 'express';
import factory from '../middleware/factory.controller';
import authController from '../controller/auth.controller';
import validate from '../middleware/schema.validator';
import registerSchema from '../schemas/user/register';
import { canals } from '../@types/types';

const { getOne, createOne, updateOne, deleteOne } = authController;

const router: Router = express.Router();

router.route('/register')
    .post(validate(registerSchema, canals.body), factory(createOne))

router.route('/login')
    .post()

router.route('/:id')
    .get(factory(getOne))
    .patch(factory(updateOne))
    .delete(factory(deleteOne))

export default router;