import { DynamicModule, LoggerService } from '@nestjs/common';
import {
  WinstonModuleAsyncOptions,
  WinstonModuleOptions,
} from './winston.interface';

export declare class WinstonModule {
  static forRoot(options: WinstonModuleOptions): DynamicModule;
  static forRootAsync(options: WinstonModuleAsyncOptions): DynamicModule;
  static createLogger(options: WinstonModuleOptions): LoggerService;
}
