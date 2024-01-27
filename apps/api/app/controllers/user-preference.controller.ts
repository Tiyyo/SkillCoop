import { Request, Response } from 'express';
import deleteDecodedKey from '../utils/delete-decoded.js';
import checkParams from '../utils/check-params.js';
import { UserPreferenceHandler } from '../services/user-preference/index.js';
import ServerError from '../helpers/errors/server.error.js';
import {
  notificationPreference as NotificationPreference,
  languagePreference as LanguagePreference,
  themePreference as ThemePreference,
} from '../models/index.js';

export default {
  async get(req: Request, res: Response) {
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
  },
  async updateNotification(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const updateObject = req.body;
    const isUpdated =
      await NotificationPreference.updatePreference(updateObject);

    res.status(200).json({ success: isUpdated });
  },
  async updateLanguage(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { user_id, name } = req.body;
    const isUpdated = await LanguagePreference.updatePreference(user_id, name);

    res.status(200).json({ success: isUpdated });
  },
  async updateTheme(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { user_id, name } = req.body;

    const isUpdated = await ThemePreference.updatePreference(user_id, name);

    res.status(200).json({ success: isUpdated });
  },
};