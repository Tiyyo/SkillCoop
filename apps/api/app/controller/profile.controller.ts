import { Request, Response } from "express";
import { profile as Profile } from "../models/index";
import { image as Image } from "../models/index";
import logger from "../helpers/logger";
import {
  deleteImageFromBucket,
  uploadImageToBucket,
} from "../service/upload/s3";
import { cacheOrGetCacheData } from "../helpers/cache-data";
import { Redis } from "ioredis";
import ServerError from "../helpers/errors/server.error";

const redisClient = new Redis();

export default {
  async getAll(req: Request, res: Response) {
    const profiles = await cacheOrGetCacheData("profiles", async () => {
      try {
        const profiles = await Profile.findAll();
        return profiles;
      } catch (error) {
        logger.error(error);
      }
    });
    return res.json(profiles);
  },
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const profile = await Profile.findOne(Number(id));

    return res.json(profile);
  },
  async createOne(req: Request, res: Response) {
    const data = req.body;

    const result = await Profile.create(data);

    await redisClient.del("profiles", (err, reply) => {
      if (err) throw new ServerError("Could not delete cache");
      logger.debug(`delete cache ${reply}`);
    });

    return res.json(result);
  },
  async updateOne(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;

    const data = { user_id: id, ...body };

    const result = await Profile.update(data);

    await redisClient.del([`profile${id}`, "profiles"], (err, reply) => {
      if (err) throw new ServerError("Could not delete cache");
      logger.debug(`delete cache ${reply}`);
    });

    return res.json(result);
  },
  async deleteOne(req: Request, res: Response) {
    const { id } = req.params;

    const result = await Profile.delete(Number(id));

    await redisClient.del([`profile${id}`, "profiles"], (err, reply) => {
      if (err) throw new ServerError("Could not delete cache");
      logger.debug(`delete cache ${reply}`);
    });

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
    const image = req.file;
    const { profile_id } = req.body;

    const [{ avatar_url }] = await Profile.findOne(profile_id);

    const { key, link } = await uploadImageToBucket(image, {
      height: 100,
      width: 100,
    });

    const newImage = await Image.update(profile_id, {
      url: key,
      key: key,
      size: 100,
    });

    const [{ key: keyToDelete }] = await Image.findMany({ url: avatar_url });

    await deleteImageFromBucket(keyToDelete);

    await redisClient.del(
      [`profile${profile_id}`, "profiles"],
      (err, reply) => {
        if (err) throw new ServerError("Could not delete cache");
        logger.debug(`delete cache ${reply}`);
      }
    );

    res.status(204).send("Image succesfully updated");
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
