import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RandomGenerationService {
  generateName() {
    const randomImageName = (bytes = 16) =>
      crypto.randomBytes(bytes).toString('hex');
    return randomImageName();
  }
}
