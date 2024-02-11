import { Request, Response } from 'express';
import { profile as Profile, image as Image } from '../../models/index.js';
import UserInputError from '../../helpers/errors/user-input.error.js';
import {
  deleteImageFromBucket,
  uploadImageToBucket,
} from '../../services/upload/s3.js';
import NotFoundError from '../../helpers/errors/not-found.error.js';

export async function updateImage(req: Request, res: Response) {
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
  const profile = await Profile.findOne({ profile_id: Number(profile_id) });

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

  await Profile.updateSyncChat(
    { profile_id: profile_id },
    { avatar_url: link },
  );

  return res.status(200).json({ link });
}
