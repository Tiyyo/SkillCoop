import { Request, Response } from 'express';
import { user as User } from '../../models/index.js';

// Migrated
export async function updateEmail(req: Request, res: Response) {
  const { email, user_id } = req.body;

  const isUpdated = await User.updateOne({ id: user_id }, { email });
  res
    .status(200)
    .json({ success: isUpdated, new_email: isUpdated ? email : null });
}
