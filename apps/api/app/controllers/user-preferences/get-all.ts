import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import checkParams from '../../utils/check-params.js';
import { UserPreferenceHandler } from '../../services/user-preference/index.js';
import ServerError from '../../helpers/errors/server.error.js';

export async function get(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const [userId] = checkParams(req.params.id);

  const userPreferenceHandler = new UserPreferenceHandler(userId);
  let userPreferences = await userPreferenceHandler.get();

  if (!userPreferences) {
    try {
      await userPreferenceHandler.generateDefault();
    } catch (error) {
      throw new ServerError(
        'Error while generating default preferences',
        'User Preference Controller',
      );
    }
    try {
      userPreferences = await userPreferenceHandler.get();
    } catch (error) {
      throw new ServerError(
        'Error while getting preferences',
        'User Preference Controller',
      );
    }
  }
  res.status(200).json(userPreferences);
}
