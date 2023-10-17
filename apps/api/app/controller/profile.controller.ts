import { Request, Response } from "express";
import { profile as Profile, image } from "../models/index";
import { image as Image } from "../models/index";
import {
  deleteImageFromBucket,
  uploadImageToBucket,
} from "../service/upload/s3";
import ServerError from "../helpers/errors/server.error";
import checkParams from "../utils/check-params";


export default {
  async getOne(req: Request, res: Response) {
    const profileId = checkParams(req.params.profileId);
    const profile = await Profile.findOne(profileId);

    return res.json(profile);
  },
  async createOne(req: Request, res: Response) {
    const data = req.body;
    const result = await Profile.create(data);

    return res.json(result);
  },
  async updateOne(req: Request, res: Response) {
    const data = req.body.data;
    const result = await Profile.updateProfile(data);

    return res.json(result);
  },
  async deleteOne(req: Request, res: Response) {
    const profileId = checkParams(req.params.profileId)
    const result = await Profile.delete(profileId);

    return res.json(result);
  },
  async updateImage(req: Request, res: Response) {
    const WIDTH_AVATAR = 100;
    // TODO add multer type
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

    const { avatar_url, username } = await Profile.findOne(profile_id);

    avatarImage.originalName = `avatar_${username}`;
    const { key, link } = await uploadImageToBucket(avatarImage, {
      height: WIDTH_AVATAR,
      width: WIDTH_AVATAR,
    });
    await Image.create({
      url: link,
      key: key,
      size: WIDTH_AVATAR,
    })

    if (avatar_url) {
      const [imageToDelete] = await Image.findBy({ url: avatar_url })
      await Image.delete(imageToDelete.id)
      await deleteImageFromBucket(imageToDelete.key)
    }
    await Profile.updateProfile({ profile_id, avatar_url: link });

    return res.status(200).json({ link })
  },
  async searchProfileByUsername(req: Request, res: Response) {
    const { username, userProfileId, page } = req.query;
    if (typeof username !== "string")
      throw new ServerError("Username must be a string");

    const profiles = await Profile.findManyByUsername(
      username,
      Number(userProfileId),
      Number(page)
    );

    return res.json(profiles);
  },
};
