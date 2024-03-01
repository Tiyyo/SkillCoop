import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './infrastructure/logger/winston.logger';
import { AllExceptionFilter } from './infrastructure/exceptions/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });
  app.enableCors({
    origin: 'https://skillcoop.fr',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
  });
  // app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'auth/google/callback', method: RequestMethod.ALL }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger('AllExceptionFilter');
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, logger));
  await app.listen(8082);
}
bootstrap();
