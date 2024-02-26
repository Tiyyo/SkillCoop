import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TestListener {
  @OnEvent('new-notification')
  handleNewNotification(event) { }
}
