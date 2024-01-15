import amqp from 'amqplib';

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
  const queue = 'user-queue';

  await channel.assertQueue(queue, {
    durable: false,
  });
  const messgae = Buffer.from(
    JSON.stringify({ data: userMessageQueue, pattern: 'user-queue' }),
  );
  channel.sendToQueue(queue, messgae);

  console.log(`[x] Sent ${userMessageQueue}`);
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};
