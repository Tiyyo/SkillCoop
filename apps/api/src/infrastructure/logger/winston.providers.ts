import { Provider } from '@nestjs/common';
import { WinstonLogger } from './winston.classes';
import {
  WinstonModuleAsyncOptions,
  WinstonModuleOptions,
} from './winston.interface';
export declare function createNestWinstonLogger(
  loggerOpts: WinstonModuleOptions,
): WinstonLogger;
export declare function createWinstonProviders(
  loggerOpts: WinstonModuleOptions,
): Provider[];
export declare function createWinstonAsyncProviders(
  options: WinstonModuleAsyncOptions,
): Provider[];
