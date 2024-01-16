import amqp from 'amqplib';
import { queues } from './queue.constants.js';
import logger from '../helpers/logger.js';

type Action =
  | 'create_event'
  | 'delete_event'
  | 'add_participant'
  | 'remove_participant';

type EventQueuePublisher = {
  event_id: number;
  organizer_id: number;
  participants_id?: Array<number>;
  title?: string;
  action: Action;
};

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
