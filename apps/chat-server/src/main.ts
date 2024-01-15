import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
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
  await app.startAllMicroservices();
  await app.listen(8083);
}
bootstrap();
