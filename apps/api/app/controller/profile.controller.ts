import { Request, Response } from "express";
import { profile as Profile, image } from "../models/index";
import { image as Image } from "../models/index";
import logger from "../helpers/logger";
import {
  deleteImageFromBucket,
  uploadImageToBucket,
} from "../service/upload/s3";
import { cacheOrGetCacheData } from "../helpers/cache-data";
import { Redis } from "ioredis";
import ServerError from "../helpers/errors/server.error";
import checkParams from "../utils/check-params";

const redisClient = new Redis();

export default {
  async getOne(req: Request, res: Response) {
    const profileId = checkParams(req.params.id);
    const profile = await Profile.findOne(profileId);

    return res.json(profile);
  },
  async createOne(req: Request, res: Response) {
    const data = req.body;
    const result = await Profile.create(data);

    return res.json(result);
  },
  async updateOne(req: Request, res: Response) {
    const data = req.body;

    const result = await Profile.update(data);
    return res.json(result);
  },
  async deleteOne(req: Request, res: Response) {
    const { id } = req.params;

    const result = await Profile.delete(Number(id));

    return res.json(result);
  },
  async createImage(req: Request, res: Response) {
    const image = req.file;
    const { profile_id } = req.body;

    const { key, link } = await uploadImageToBucket(image, {
      height: 100,
      width: 100,
    });

    const newImage = await Image.create({
      url: link,
      key: key,
      size: 100,
    });
    const isUpdate = await Profile.update({ profile_id, avatar_url: link });

    await redisClient.del(
      [`profile${profile_id}`, "profiles"],
      (err, reply) => {
        if (err) throw new ServerError("Could not delete cache");
        logger.debug(`delete cache ${reply}`);
      }
    );

    res.send("ok");
  },
  async updateImage(req: Request, res: Response) {
    const WIDTH_AVATAR = 100;
    const avatar = req.file;
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
    if (!avatar_url) {
      avatar.originalName = `avatar_${username}`;
      const { key, link } = await uploadImageToBucket(avatar, {
        height: WIDTH_AVATAR,
        width: WIDTH_AVATAR,
      });
      await Image.create({
        url: link,
        key: key,
        size: WIDTH_AVATAR,
      })
      await Profile.update({ profile_id, avatar_url: link });
      return res.status(200).json({ link })
    } else {
      const { key: keyNewImage, link: linkNewImage } = await uploadImageToBucket(avatar, {
        height: WIDTH_AVATAR,
        width: WIDTH_AVATAR,
      });
      const [imageToDelete] = await Image.findBy({ url: avatar_url })

      await Image.delete(imageToDelete.id)
      await deleteImageFromBucket(imageToDelete.key)
      await Image.create({
        url: linkNewImage,
        key: keyNewImage,
        size: WIDTH_AVATAR,
      })
      await Profile.update({ profile_id, avatar_url: linkNewImage });
      return res.status(200).json({ link: linkNewImage })
    }
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
