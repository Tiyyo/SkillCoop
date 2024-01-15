import { Request, Response } from 'express';
import tokenHandler from '../../helpers/token.handler.js';
import { user as User } from '../../models/index.js';
import ForbidenError from '../../helpers/errors/forbiden.js';
import emailService from '../../utils/send-email.js';

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user && user.verified === 0) {
    throw new ForbidenError(
      'User accound not verified',
      'Not allowed',
      'forgotPassword',
      ' 169',
    );
  }

  if (user && user.verified === 1) {
    const resetPasswordToken = tokenHandler.createToken(
      '10m',
      process.env.JWT_EMAIL_TOKEN_KEY as string,
      {
        user_id: user.id,
      },
    );
    await emailService.sendLinkRestPassword({
      resetToken: resetPasswordToken,
      email: email,
      userId: user.id,
    });
  }

  res.status(200).json({
    message: 'If you have a valid account an email has been sent',
  });
}
