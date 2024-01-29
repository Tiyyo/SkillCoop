import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './helpers/winston.logger';
import { HttpLogger } from './middleware/access-http.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger
    })
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  app.use(new HttpLogger().use)
  app.enableCors({
    origin: 'http://localhost:5004',
    allowedHeaders: ['content-type'],
    credentials: true,
  });
  app.connectMicroservice({
    transport: 5,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'user-queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.connectMicroservice({
    transport: 5,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'event-queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.connectMicroservice({
    transport: 5,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'participant-queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(8083);
}
bootstrap();
