import amqp from 'amqplib';
import logger from '../helpers/logger.js';
import { ParticipantQueuePublisher, queues } from '@skillcoop/types';

export const participantQueuePublisher = async (
  participantMessageQueue: ParticipantQueuePublisher,
) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queues.participant, {
    durable: false,
  });
  const messgae = Buffer.from(
    JSON.stringify({
      data: participantMessageQueue,
      pattern: queues.participant,
    }),
  );
  channel.sendToQueue(queues.participant, messgae);

  logger.debug(
    `New message push to ${queues.participant} ${JSON.stringify(
      participantMessageQueue,
    )}`,
  );
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};
