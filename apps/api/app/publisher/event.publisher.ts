import amqp from 'amqplib';
import logger from '../helpers/logger.js';
import { EventQueuePublisher, queues } from '@skillcoop/types';

export const eventQueuePublisher = async (
  eventMessageQueue: EventQueuePublisher,
) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queues.event, {
    durable: false,
  });
  const messgae = Buffer.from(
    JSON.stringify({ data: eventMessageQueue, pattern: queues.event }),
  );
  channel.sendToQueue(queues.event, messgae);
  logger.debug(
    `New message push to ${queues.event} ${JSON.stringify(eventMessageQueue)}`,
  );
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};
