import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import ServerError from '../../helpers/errors/server.error.js';
import { user as User } from '../../models/index.js';
import tokenHandler from '../../helpers/token.handler.js';

export async function resetPassword(req: Request, res: Response) {
  const token = req.cookies._rset;
  const { password } = req.body;
  const saltRouds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRouds).catch((err) => {
    if (err)
      throw new ServerError("Couldn't hash user password", 'resetPassword');
  });
  // ??? why ???
  if (!hashedPassword) throw new ServerError('hash password is missing');

  try {
    const infos = tokenHandler.verifyTokenAndGetData(
      token,
      process.env.JWT_EMAIL_TOKEN_KEY as string,
    );

    if (!infos || !infos.user_id)
      return res.status(200).json({ message: 'expire' });

    if (infos && infos.user_id) {
      await User.updateOne(
        { id: +infos.user_id },
        { password: hashedPassword, blocked: 0, failed_attempts: 0 },
      );

      res.status(200).json({ message: 'success' });
    }
  } catch (error) {
    return res.status(200).json({ message: 'expire' });
  }
}
