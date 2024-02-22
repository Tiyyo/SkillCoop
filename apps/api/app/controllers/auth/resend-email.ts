import { Request, Response } from 'express';
import emailService from '../../utils/send-email.js';
import NotFoundError from '../../helpers/errors/not-found.error.js';
import tokenHandler from '../../helpers/token.handler.js';
import { user as User } from '../../models/index.js';
// Migrated
export async function resendEmail(req: Request, res: Response) {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    throw new NotFoundError(
      "Couldn't find user with email provided in database",
      'resendEmail',
      ' 152',
    );
  const emailToken = tokenHandler.createToken(
    '1h',
    process.env.JWT_EMAIL_TOKEN_KEY as string,
    {
      user_id: user.id,
    },
  );

  const url = `${process.env.API_URL}/auth/${user.id}/verify/${emailToken}`;
  const text = `Click on the link to verify your email: ${url}`;
  await emailService.sendVerify(email, 'validate your email', text);

  return res
    .status(200)
    .json({ message: 'A new confirmation email has been sent' });
}
