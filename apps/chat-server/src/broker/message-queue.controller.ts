import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MessageQueueController {
  @MessagePattern('user-queue')
  async handleUserQueue(data) {
    console.log('user-queue messages', data);
    // call user queue service
  }
  @MessagePattern('event-queue')
  async handleEventQueue(data) {
    // call event queue service
    console.log(data);
  }
}
