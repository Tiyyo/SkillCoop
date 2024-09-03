import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './helpers/winston.logger';
import { Logger } from '@nestjs/common';
import { HttpLogger } from './middleware/access-http.middleware';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const whitelist = [
  'http://localhost:5004',
  'https://www.skillcoop.fr',
  'https://skillcoop.fr',
];

const clientUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : 'http://localhost:5004';

Logger.log(`Client url: ${clientUrl}`, 'Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(new HttpLogger().use);
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    // allowedHeaders: ['content-type', 'Authorization'],
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
