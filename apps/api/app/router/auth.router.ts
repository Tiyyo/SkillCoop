import express, { Router } from 'express';
import factory from '../middleware/factory.controller';
import authController from '../controller/auth.controller';
import validate from '../middleware/schema.validator';
import registerSchema from '../schemas/user/register';
import loginSchema from '../schemas/user/login';
import { canals } from '../@types/types';
import { validateToken } from '../middleware/validate.token';

const { signin, register, refresh } = authController;

const router: Router = express.Router();

router.route('/register')
    .post(validate(registerSchema, canals.body), factory(register))

router.route('/login')
    .post(validate(loginSchema, canals.body), factory(signin))

router.route('/refresh')
    .get(validateToken, factory(refresh))

// router.route('/:id')
// .patch(factory(updateOne))
// .get(factory(getOne))
// .delete(factory(deleteOne))

export default router;