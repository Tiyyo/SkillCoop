import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { user as User } from '../../models/index.js';
import NotFoundError from '../../helpers/errors/not-found.error.js';

export async function updatePassword(req: Request, res: Response) {
  const { old_password, new_password, user_id } = req.body;
  const user = await User.findOne({ id: user_id });

  if (!user) throw new NotFoundError('User not found');

  // check if old password match
  // create a new hash password
  // update the user with the new hash password

  const isMatch = await bcrypt.compare(old_password, user.password);
  if (!isMatch) throw new Error('Password do not match');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(new_password, saltRounds);

  const isUpdate = await User.updateOne(
    { id: user_id },
    { password: hashedPassword },
  );

  res.status(200).json({ success: isUpdate });
}
