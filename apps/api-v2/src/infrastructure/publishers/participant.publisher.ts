import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { ParticipantQueuePublisher, queues } from '@skillcoop/types';

@Injectable()
export class ProducerParticipantMessageService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(queues.participant, { durable: false });
      },
    });
  }

  async pushToParticipantQueue(
    participantMessageQueue: ParticipantQueuePublisher,
  ) {
    try {
      await this.channelWrapper.sendToQueue(
        queues.participant,
        Buffer.from(
          JSON.stringify({
            data: participantMessageQueue,
            pattern: queues.participant,
          }),
        ),
        {
          persistent: true,
        },
      );
      Logger.log(
        `New message push to ${queues.participant} ${JSON.stringify(
          participantMessageQueue,
        )}`,
      );
    } catch (error) {
      throw new HttpException(
        'Error adding message to participant queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
