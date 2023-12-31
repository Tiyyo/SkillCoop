import { Request, Response } from 'express';
import { profile as Profile } from '../models/index';
import { image as Image } from '../models/index';
import {
  deleteImageFromBucket,
  uploadImageToBucket,
} from '../service/upload/s3';
import checkParams from '../utils/check-params';
import UserInputError from '../helpers/errors/user-input.error';
import NotFoundError from '../helpers/errors/not-found.error';

export default {
  async getOne(req: Request, res: Response) {
    const [profileId] = checkParams(req.params.profileId);
    const profile = await Profile.findOne({ id: profileId });

    return res.status(200).json(profile);
  },
  async createOne(req: Request, res: Response) {
    const data = req.body;
    const result = await Profile.createOne(data);

    return res.status(201).json({ success: result });
  },
  async updateOne(req: Request, res: Response) {
    const { profile_id, ...data } = req.body.data;
    const isUpdate = await Profile.updateOne({ id: profile_id }, data);

    return res.status(204).send({ success: isUpdate });
  },
  async updateImage(req: Request, res: Response) {
    const WIDTH_AVATAR = 100;
    const avatarImage = req.file;
    const { profile_id } = req.body;

    // check if user has an avatar
    // if not
    // create image
    // update profile with image url
    // return image url
    // if yes
    // delete old image from bucket
    // delete old image from db
    // create new image
    // update profile with new image url
    // return new image url

    if (!avatarImage) throw new UserInputError('No image provided');
    const profile = await Profile.findOne({ id: Number(profile_id) });

    if (!profile) {
      throw new UserInputError('Profile not found');
    }
    const { username, avatar_url } = profile;

    avatarImage.originalname = `avatar_${username}`;

    const { key, link } = await uploadImageToBucket(avatarImage, {
      height: WIDTH_AVATAR,
      width: WIDTH_AVATAR,
    });
    await Image.createOne({
      url: link,
      key: key,
      size: WIDTH_AVATAR,
    });

    if (avatar_url) {
      const imageToDelete = await Image.findOne({ url: avatar_url });
      if (!imageToDelete) throw new NotFoundError('Image not found');
      await Image.deleteOne({ id: imageToDelete.id });

      if (imageToDelete.key) {
        await deleteImageFromBucket(imageToDelete.key);
      }
    }

    await Profile.updateOne({ id: profile_id }, { avatar_url: link });

    return res.status(200).json({ link });
  },
  async searchProfileByUsername(req: Request, res: Response) {
    const { username } = req.query;
    // Reminder: checkParams can also be use to convert string to number
    const [userProfileId, page] = checkParams(
      req.query.userProfileId,
      req.query.page,
    );
    if (typeof username !== 'string')
      throw new UserInputError('Username must be a string');

    const profiles = await Profile.findManyByUsername(
      username,
      userProfileId,
      page,
    );
    if (!profiles || profiles.length === 0)
      throw new NotFoundError('No profile found');

    return res.status(200).json(profiles);
  },
};
