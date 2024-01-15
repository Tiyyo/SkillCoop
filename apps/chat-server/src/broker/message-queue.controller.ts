import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserQueueDto } from './user-queue.dto';
import { UserQueueDispatcher } from './user.queue.dispatcher';

@Controller()
export class MessageQueueController {
  constructor(private userQueueDispatcher: UserQueueDispatcher) { }
  @MessagePattern('user-queue')
  async handleUserQueue(userQueueMessage: UserQueueDto) {
    console.log('user-queue messages', userQueueMessage);
    return this.userQueueDispatcher.dispatch(userQueueMessage);
    // here a UserQueueDispatcher service in charge to read data
    // and redirect to the right datasync service according data.action
  }
  @MessagePattern('event-queue')
  async handleEventQueue(data) {
    // here a EventQueueDispatcher service in charge to read data
    // and redirect to the right datasync service according data.action
    console.log(data);
  }
}
