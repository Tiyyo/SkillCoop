import { Format } from 'logform';
import { NestLikeConsoleFormatOptions } from './winston.interface';

export declare const utilities: {
  format: {
    nestLike: (
      appName?: string,
      options?: NestLikeConsoleFormatOptions,
    ) => Format;
  };
};
