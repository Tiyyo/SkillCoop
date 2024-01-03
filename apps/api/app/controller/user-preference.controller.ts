import { Request, Response } from 'express';
import deleteDecodedKey from '../utils/delete-decoded';
import checkParams from '../utils/check-params';
import { UserPreferenceHandler } from '../service/user-preference';

export default {
  async get(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const [user_id] = checkParams(req.params.id);
    const userPreferenceHandler = new UserPreferenceHandler(user_id);

    let userPreferences = userPreferenceHandler.get();

    if (!userPreferences) {
      await userPreferenceHandler.generateDefault();
      userPreferences = userPreferenceHandler.get();
    }

    res.status(200).json({ userPreference: userPreferences });
  },
  async updateNotification(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { user_id, type_name, ...transportMethods } = req.body;
    // some logic here
    res.status(200).json({ message: 'success' });
  },
  async updateLanguage(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { user_id, name } = req.body;
    //some logic here
    res.status(200).json({ message: 'success' });
  },
  async updateTheme(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { user_id, name } = req.body;
    // some logic here
    res.status(200).json({ message: 'success' });
  },
};
