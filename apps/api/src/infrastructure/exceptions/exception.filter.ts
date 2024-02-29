import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { DomainException } from 'src/domain/shared/domain-exception';
import { DatabaseException } from '../kysely/database.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService, // private readonly envVariableService: NestEnvVariableAdapterService,
  ) { }

  catch(exception: unknown, host: ArgumentsHost) {
    const isProduction = process.env.NODE_ENV === 'production';

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = 500;
    const isKnownException =
      exception instanceof ApplicationException ||
      exception instanceof DomainException ||
      exception instanceof HttpException ||
      exception instanceof DatabaseException;

    this.logger.error('Error handle by filter', exception);
    this.logger.log(exception);
    this.logger.verbose(exception);

    if (exception instanceof ApplicationException) {
      isProduction
        ? this.logger.error(exception.getUserMessage())
        : this.logger.error(exception.message);
    }

    if (exception instanceof DomainException) {
      isProduction
        ? this.logger.error(exception.getUserMessage())
        : this.logger.error(exception.message);
    }

    if (exception instanceof DatabaseException) {
      isProduction
        ? this.logger.error(exception.getUserMessage())
        : this.logger.error(exception.message);
    }

    if (exception instanceof HttpException) {
      this.logger.error(exception.message);
    }

    if (isKnownException) {
      httpStatus = exception.getStatus();
    }

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
    }

    const userMessage = () => {
      if (exception instanceof ApplicationException) {
        return exception.getUserMessage();
      }
      if (exception instanceof DomainException) {
        return exception.getUserMessage();
      }
      if (exception instanceof DatabaseException) {
        return exception.getUserMessage();
      }
      return 'Internal Server Error';
    };

    const message = () => {
      if (exception instanceof ApplicationException) {
        return exception.getMessage();
      }
      if (exception instanceof DomainException) {
        return exception.getMessage();
      }
      if (exception instanceof DatabaseException) {
        return exception.getMessage();
      }
      if (exception instanceof HttpException) {
        return exception.message;
      }
      return 'Internal Server Error';
    };
    const responseBody = {
      statusCode: httpStatus,
      error: isKnownException && isProduction ? userMessage() : message(),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
