import { Request, Response } from 'express';
import authService from '../../services/auth/auth.js';
import ServerError from '../../helpers/errors/server.error.js';
import DatabaseError from '../../helpers/errors/database.error.js';
import logger from '../../helpers/logger.js';
import tokenHandler from '../../helpers/token.handler.js';
import emailService from '../../utils/send-email.js';
//Migrated
export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  let newUser: { id: number; email: string };

  try {
    const shouldCreateNewUser = await authService.createUser({
      email,
      password,
    });
    if (shouldCreateNewUser) {
      newUser = shouldCreateNewUser;
    } else throw new ServerError('Failed create user', 'register');
  } catch (error) {
    if (error instanceof ServerError || error instanceof DatabaseError) {
      logger.error(error.message);
    }
    return res.status(400).send('Infos not valid');
  }

  const emailToken = tokenHandler.createToken(
    '1h',
    process.env.JWT_EMAIL_TOKEN_KEY as string,
    {
      user_id: newUser.id,
    },
  );
  await emailService.sendEmailToConfirmEmail({
    emailToken,
    email,
    userId: newUser.id,
  });

  return res.status(200).json({
    message: 'A link to activate your account has been sent to provided email',
  });
}
