export const messageQueueConfig = [
  {
    name: 'USER_MQ',
    transport: 5, // Transport.RMQ => one more reason to not use enum
    urls: ['amqp://localhost:5672'],
    queue: 'user-queue',
    queueOptions: { durable: false },
  },
];
