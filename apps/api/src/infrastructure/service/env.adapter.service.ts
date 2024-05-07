import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariableRepository } from 'src/domain/repositories/env.variable.repository';

@Injectable()
export class NestEnvVariableAdapterService implements EnvVariableRepository {
  constructor(private configService: ConfigService) { }
  getEnvVariable(name: string): string {
    return this.configService.get(name);
  }
  getClientUrl(): string {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    return isProduction
      ? this.configService.get('CLIENT_PROD_URL')
      : this.configService.get('CLIENT_DEV_URL');
  }
  getApiUrl(): string {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    return isProduction
      ? this.configService.get('API_PROD_URL')
      : this.configService.get('API_DEV_URL');
  }
  getHost(): string {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    return isProduction
      ? this.configService.get('HOST')
      : this.configService.get('localhost');
  }
  isProduction(): boolean {
    console.log('IsProduction', this.configService.get('NODE_ENV'));
    return this.configService.get('NODE_ENV') === 'production';
  }
}
