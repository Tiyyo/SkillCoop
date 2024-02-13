import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
/*eslint-disable */
import { languagePreference as LanguagePreference } from '../../models/index.js';
/*eslint-enable */

export async function updateLanguage(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const { user_id, name } = req.body;
  const isUpdated = await LanguagePreference.updatePreference(user_id, name);

  res.status(200).json({ success: isUpdated });
}
