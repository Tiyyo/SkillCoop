import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import { themePreference as ThemePreference } from '../../models/index.js';

//Migrated
export async function updateTheme(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const { user_id, name } = req.body;

  const isUpdated = await ThemePreference.updatePreference(user_id, name);

  res.status(200).json({ success: isUpdated });
}
