import { Injectable } from '@nestjs/common';
import { UploadImageService } from 'src/application/services/upload.service';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import { NestEnvVariableAdapterService } from '../service/env.adapter.service';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { ImageService } from 'src/domain/services/image/image.service';
import { RandomGenerationService } from 'src/application/services/random.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UploadAWSService implements UploadImageService {
  declare s3: S3Client;

  declare cloudFront: CloudFrontClient;

  private imageService: ImageService;

  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
    private readonly randomGenerationService: RandomGenerationService,
    private moduleRef: ModuleRef, // private readonly imageService: ImageService,
  ) {
    // private readonly imageService: ImageService, // private readonly envVariableService: NestEnvVariableAdapterService, // private readonly randomGenerationService: RandomGenerationService,
    if (!this.envVariableService.getEnvVariable('ACCESS_KEY_BUCKET')) {
      throw new ApplicationException(
        'ACCESS_KEY_BUCKET env is not set',
        'UploadAWSService',
      );
    }
    if (!this.envVariableService.getEnvVariable('ACCESS_SECRET_KEY_S3')) {
      throw new ApplicationException(
        'ACCESS_SECRET_KEY_S3 env is not set',
        'UploadAWSService',
      );
    }
    if (!this.envVariableService.getEnvVariable('BUCKET_REGION')) {
      throw new ApplicationException(
        'BUCKET_REGION env is not set',
        'UploadAWSService',
      );
    }
    if (!this.envVariableService.getEnvVariable('BUCKET_NAME')) {
      throw new ApplicationException(
        'BUCKET_NAME env is not set',
        'UploadAWSService',
      );
    }
    if (!this.envVariableService.getEnvVariable('CLOUDFRONT_DOMAIN')) {
      throw new ApplicationException(
        'CLOUDFRONT_DOMAIN env is not set',
        'UploadAWSService',
      );
    }
    if (!this.envVariableService.getEnvVariable('CLOUDFRONT_DISTRIBUTION_ID')) {
      throw new ApplicationException(
        'CLOUDFRONT_DISTRIBUTION_ID env is not set',
        'UploadAWSService',
      );
    }
    this.s3 = new S3Client({
      credentials: {
        accessKeyId:
          this.envVariableService.getEnvVariable('ACCESS_KEY_BUCKET'),
        secretAccessKey: this.envVariableService.getEnvVariable(
          'ACCESS_SECRET_KEY_S3',
        ),
      },
      region: this.envVariableService.getEnvVariable('BUCKET_REGION'),
    });
    this.cloudFront = new CloudFrontClient({
      credentials: {
        accessKeyId:
          this.envVariableService.getEnvVariable('ACCESS_KEY_BUCKET'),
        secretAccessKey: this.envVariableService.getEnvVariable(
          'ACCESS_SECRET_KEY_S3',
        ),
      },
      region: this.envVariableService.getEnvVariable('BUCKET_REGION'),
    });
  }

  async uploadImage(
    file: unknown,
    { height, width }: { height: number; width: number },
  ) {
    console.log('file', file);
    console.log('height', height);
    console.log('width', width);
    this.imageService =
      this.imageService ?? this.moduleRef.get(ImageService, { strict: false });
    const { buffer, originalname, mimetype } =
      await this.imageService.handleOrigin(file);
    const resizedBuffer = await this.imageService.resizeImage(
      buffer,
      height,
      width,
    );
    const imageKey = `${this.randomGenerationService.generateName()}_${originalname}_w${width}`;

    const params = {
      Bucket: this.envVariableService.getEnvVariable('BUCKET_NAME'),
      Key: imageKey,
      Body: resizedBuffer,
      ContentType: mimetype,
    };

    const command = new PutObjectCommand(params);

    await this.s3.send(command).catch((err) => {
      if (err instanceof Error) {
        throw new ApplicationException(
          'Upload to bucket has failed : ' + err.message,
          'UploadAWSService',
        );
      }
    });
    const link = `${this.envVariableService.getEnvVariable(
      'CLOUDFRONT_DOMAIN',
    )}/${imageKey}`;

    return {
      key: imageKey,
      link,
    };
    return {
      key: 'coucocu',
      link: 'ouo',
    };
  }
  async invalidateCache(imageKey: string) {
    const invalidationParams = {
      DistributionId: this.envVariableService.getEnvVariable(
        'CLOUDFRONT_DISTRIBUTION_ID',
      ),
      InvalidationBatch: {
        CallerReference: imageKey,
        Paths: {
          Quantity: 1,
          Items: [`/${imageKey}`],
        },
      },
    };
    await this.cloudFront.send(
      new CreateInvalidationCommand(invalidationParams),
    );
  }
  async deleteImage(imageKey: string) {
    const params = {
      Bucket: this.envVariableService.getEnvVariable('BUCKET_NAME'),
      Key: imageKey,
    };
    if (!params || !params.Key || !params.Bucket) {
      throw new ApplicationException(
        'Invalid params for delete image',
        'UploadAWSService',
      );
    }
    try {
      await this.s3.send(new DeleteObjectCommand(params));
      this.invalidateCache(imageKey);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message + 'Object have not been delete from bucket');
      }
    }
  }
}
