import express, { Router } from 'express';
import factory from '../middleware/factory.controller';
import authController from '../controller/auth.controller';
import validate from '../middleware/schema.validator';
// import registerSchema from '../schemas/user/register';
// import loginSchema from '../schemas/user/login';
import { canals } from '../@types/types';
import validateToken from '../middleware/validate.token';
import schema from 'schema/index'


const { signin, register, refresh, logout, googleAuth } = authController;
const { registerSchema, loginSchema } = schema

const router: Router = express.Router();

router.route('/register')
  // TS doesnt recognnize schema with a super refine as a valid type
  .post(validate(registerSchema, canals.body), factory(register))

router.route('/login')
  .post(validate(loginSchema, canals.body), factory(signin))

router.route('/refresh')
  .get(validateToken, factory(refresh))

router.route('/google/callback').get(factory(googleAuth))

router.route('/logout')
  .post(factory(logout))

export default router;