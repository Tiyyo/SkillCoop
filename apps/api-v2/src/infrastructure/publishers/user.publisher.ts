import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { UserQueuePublisher, queues } from '@skillcoop/types';

@Injectable()
export class ProducerUserMessageService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(queues.user, { durable: false });
      },
    });
  }

  async pushToUserQueue(userMessageQueue: UserQueuePublisher) {
    try {
      await this.channelWrapper.sendToQueue(
        queues.user,
        Buffer.from(
          JSON.stringify({
            data: userMessageQueue,
            pattern: queues.user,
          }),
        ),
        {
          persistent: true,
        },
      );
      Logger.log(
        `New message push to ${queues.user} ${JSON.stringify(
          userMessageQueue,
        )}`,
      );
    } catch (error) {
      throw new HttpException(
        'Error adding message to user queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
