import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { EventQueuePublisher, queues } from '@skillcoop/types';

@Injectable()
export class ProducerEventMessageService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(queues.event, { durable: false });
      },
    });
  }

  async pushToEventQueue(eventMessageQueue: EventQueuePublisher) {
    try {
      await this.channelWrapper.sendToQueue(
        queues.event,
        Buffer.from(
          JSON.stringify({ data: eventMessageQueue, pattern: queues.event }),
        ),
        {
          persistent: true,
        },
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new HttpException(
        'Error adding mail to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
