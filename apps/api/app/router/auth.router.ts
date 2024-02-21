import express, { Router } from 'express';
import { canals } from '../@types/types.js';
import { registerSchema, loginSchema, emailSchema } from '@skillcoop/schema';
import { infosDemoAccountProvider } from '../middlewares/demo-account.js';
import { sanitizeParams } from '../middlewares/sanitizer.params.js';
import factory from '../middlewares/wrapper-controller.js';
import { validateSchema } from '../middlewares/schema-validator.js';
import tokenHandler from '../helpers/token.handler.js';
import { signin } from '../controllers/auth/signin.js';
import { refresh } from '../controllers/auth/refresh-token.js';
import { register } from '../controllers/auth/register.js';
import { verifyEmail } from '../controllers/auth/verify-email.js';
import { logout } from '../controllers/auth/logout.js';
import { googleAuth } from '../controllers/auth/google-auth.js';
import { resendEmail } from '../controllers/auth/resend-email.js';
import { forgotPassword } from '../controllers/auth/forgot-password.js';
import { resetPassword } from '../controllers/auth/reset-password.js';
/*eslint-disable */
import { redirectToResetPassword } from '../controllers/auth/redirect-to reset-password.js';
import { verifyResetPasswordToken } from '../controllers/auth/verify-password-token.js';
/*eslint-enable */

//Migrated
const router: Router = express.Router();

router
  .route('/register')
  .post(validateSchema(registerSchema, canals.body), factory(register));

router
  .route('/login')
  .post(validateSchema(loginSchema, canals.body), factory(signin));

router
  .route('/refresh')
  .get(tokenHandler.validate('refresh'), factory(refresh));

router
  .route('/email')
  .post(validateSchema(emailSchema, canals.body), factory(resendEmail));

router.route('/google/callback').get(factory(googleAuth));

router
  .route('/forgot-password')
  .post(validateSchema(emailSchema, canals.body), factory(forgotPassword));

router
  .route('/:userId/reset-password/:token')
  .get(sanitizeParams, factory(redirectToResetPassword));

router
  .route('/reset-password')
  .get(verifyResetPasswordToken)
  .post(factory(resetPassword));

router.route('/demo').post(infosDemoAccountProvider, factory(signin));

router
  .route('/:userId/verify/:token')
  .get(sanitizeParams, factory(verifyEmail));

router.route('/logout').post(factory(logout));

export default router;
