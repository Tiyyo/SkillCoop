import { Injectable, NestMiddleware } from "@nestjs/common";
import morgan from "morgan";
import * as http from 'http';

@Injectable()
export class HttpLogger implements NestMiddleware {
  format = ':method :url :status :res[content-length] - :response-time ms';

  public static configure(format: string | morgan.FormatFn, opts?: morgan.Options<http.IncomingMessage, http.ServerResponse>) {
    this.format = format;
    this.options = opts;
  }

  public static token(name: string, callback: morgan.TokenCallbackFn): morgan.Morgan<http.IncomingMessage, http.ServerResponse> {
    return morgan.token(name, callback);
  }

  private static options: morgan.Options<http.IncomingMessage, http.ServerResponse>;
  private static format: string | morgan.FormatFn;

  public use(req: any, res: any, next: any) {
    HttpLogger.configure(':method :url :status :res[content-length] - :response-time ms')
    if (HttpLogger.format) {
      morgan(HttpLogger.format as any, HttpLogger.options)(req, res, next);
    } else {
      throw new Error('MorganMiddleware must be configured with a logger format.');
    }
  }
}