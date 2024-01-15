import { Controller, Injectable } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserQueueService {
  @MessagePattern('user-queue')
  async handleUserMessage(message: any) {
    // Handle user-related message
    console.log('Message pattern user queue service', message);
  }
}
