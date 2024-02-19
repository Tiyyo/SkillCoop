import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadAWSService {
  constructor() { }
  async uploadToS3() { }
  async deleteFromS3() { }
  private async invalideCloudfrontCache() { }
}
