import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class RandomGenerationService {
  generateName() {
    return (bytes = 16) => crypto.randomBytes(bytes).toString('hex');
  }
}
