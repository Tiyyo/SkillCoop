import express, { Router } from 'express';
import factory from '../middleware/wrapper-controller';
import authController from '../controller/auth.controller';
import validate from '../middleware/schema-validator';
// import registerSchema from '../schemas/user/register';
// import loginSchema from '../schemas/user/login';
import { canals } from '../@types/types';
import validateToken from '../middleware/validate-token';
import schema from 'schema'
import validateEmaiToken from '../middleware/validate-email-token';


const { signin, register, refresh, logout, googleAuth, verifyEmail, resendEmail } = authController;
const { registerSchema, loginSchema, sendVerifEmailSchema } = schema

const router: Router = express.Router();

router.route('/register')
  // TS doesnt recognnize schema with a super refine as a valid type
  .post(validate(registerSchema, canals.body), factory(register))

router.route('/login')
  .post(validate(loginSchema, canals.body), factory(signin))

router.route('/refresh')
  .get(validateToken, factory(refresh))

router.route('/email')
  .post(validate(sendVerifEmailSchema, canals.body), factory(resendEmail))

router.route('/google/callback')
  .get(factory(googleAuth))

router.route('/:userId/verify/:token')
  .get(factory(verifyEmail))

router.route('/logout')
  .post(factory(logout))

export default router;