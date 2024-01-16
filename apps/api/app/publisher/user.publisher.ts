import amqp from 'amqplib';
import logger from '../helpers/logger.js';
import { queues } from './queue.constants.js';

type Action = 'create' | 'update' | 'delete';

type UserQueuePublisher = {
  profile_id: number;
  username?: string;
  avatar?: string | null;
  action: Action;
};

export const userQueuePublisher = async (
  userMessageQueue: UserQueuePublisher,
) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queues.user, {
    durable: false,
  });
  const messgae = Buffer.from(
    JSON.stringify({ data: userMessageQueue, pattern: queues.user }),
  );
  channel.sendToQueue(queues.user, messgae);
  logger.debug(
    `New message push to ${queues.user} ${JSON.stringify(userMessageQueue)}`,
  );
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};
