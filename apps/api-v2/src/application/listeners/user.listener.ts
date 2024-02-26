import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  UserCreatedEventPayload,
  UserDeletedEventPayload,
} from 'src/domain/shared/event-payload.types';

@Injectable()
export class UserListener {
  @OnEvent('user.created')
  handleUserCreated(payload: UserCreatedEventPayload) {
    console.log('user created', payload);
  }
  @OnEvent('user.deleted')
  handleUserDelete(payload: UserDeletedEventPayload) {
    console.log('user updated', payload);
  }
}
