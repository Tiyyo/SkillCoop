import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserQueueDispatcher } from './user.queue.dispatcher';
import { EventQueueDispatcher } from './event.queue.dispatcher';
import { ParticipantQueueDispatcher } from './participant.queue.dispatcher';
import {
  EventQueuePublisher,
  UserQueuePublisher,
  ParticipantQueuePublisher,
} from '@skillcoop/types';

@Controller()
export class MessageQueueController {
  constructor(
    private userQueueDispatcher: UserQueueDispatcher,
    private eventQueueDispatcher: EventQueueDispatcher,
    private participantQueueMessage: ParticipantQueueDispatcher,
  ) { }
  @MessagePattern('user-queue')
  async handleUserQueue(userQueueMessage: UserQueuePublisher) {
    return this.userQueueDispatcher.dispatch(userQueueMessage);
  }
  @MessagePattern('event-queue')
  async handleEventQueue(eventQueueMessage: EventQueuePublisher) {
    return this.eventQueueDispatcher.dispatch(eventQueueMessage);
  }
  @MessagePattern('participant-queue')
  async handleParticipantQueue(
    participantQueuemessage: ParticipantQueuePublisher,
  ) {
    return this.participantQueueMessage.dispatch(participantQueuemessage);
  }
}
