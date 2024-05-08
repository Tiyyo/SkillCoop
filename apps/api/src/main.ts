import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './infrastructure/logger/winston.logger';
import { AllExceptionFilter } from './infrastructure/exceptions/exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });
  app.use(helmet());
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
  // app.enableCors({
  //   origin: ['https://skillcoop.fr', 'http://localhost:5004'],
  //   allowedHeaders: ['content-type', 'Authorization'],
  //   methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
  //   credentials: true,
  //   preflightContinue: false,
  //   optionsSuccessStatus: 200,
  // });
  app.enableCors({
    origin: ['http://localhost:5004', 'https://skillcoop.fr'],
    allowedHeaders: ['content-type', 'Authorization'],
    credentials: true,
  });
  console.log('Listening on port 8082');
  console.log('Environement:', process.env.NODE_ENV);
  await app.listen(8082);
}
bootstrap();
