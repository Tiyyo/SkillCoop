import ServerError from '../../helpers/errors/server.error';
import logger from '../../helpers/logger';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import crypto from 'crypto';

import resizeImage from '../../helpers/resize-image';

const region = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKeyId = process.env.ACCESS_KEY_BUCKET;
const secretAccessKey = process.env.ACCESS_SECRET_KEY_S3;
const cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN;
const cloudFrontDistributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;

if (!region) throw new ServerError('BUCKET_REGION env is not set');
if (!bucketName) throw new ServerError('BUCKET_NAME env is not set');
if (!accessKeyId) throw new ServerError('ACCESS_KEY_BUCKET env is not set');
if (!secretAccessKey) throw new ServerError('ACCESS_SECRET_KEY_S3 is not set');

const randomImageName = (bytes = 16) =>
  crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const cloudFront = new CloudFrontClient({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export async function uploadImageToBucket(
  file: Express.Multer.File,
  { height, width }: { height: number; width: number },
) {
  const resizeFileBuffer = await resizeImage(file.buffer, height, width);
  const imageKey = `${randomImageName()}_${file.originalname}_w${width}`;

  const params = {
    Bucket: bucketName,
    Key: imageKey,
    Body: resizeFileBuffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command).catch((err) => {
    if (err instanceof Error) {
      throw new ServerError('Upload to bucket has failed : ' + err.message);
    }
  });
  const link = `${cloudFrontDomain}/${imageKey}`;

  return {
    key: imageKey,
    link: link,
  };
}

export const invalidateCache = async (imageKey: string) => {
  const invalidationParams = {
    DistributionId: cloudFrontDistributionId,
    InvalidationBatch: {
      CallerReference: imageKey,
      Paths: {
        Quantity: 1,
        Items: [`/${imageKey}`],
      },
    },
  };
  await cloudFront.send(new CreateInvalidationCommand(invalidationParams));
};

export async function deleteImageFromBucket(imageKey: string) {
  if (!bucketName) throw new ServerError('BUCKET_NAME env is not set');

  const params = {
    Bucket: bucketName,
    Key: imageKey,
  };

  if (!params || !params.Key || !params.Bucket)
    throw new ServerError('Params is missing a key or a bucket name');

  try {
    await s3.send(new DeleteObjectCommand(params));
    invalidateCache(imageKey);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message + 'Object have not been delete from bucket');
    }
  }
}
