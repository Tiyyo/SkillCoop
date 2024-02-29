import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserPreferencesService } from 'src/domain/services/user-prefrerences/user-preferences.service';
import {
  UserCreatedEventPayload,
  UserDeletedEventPayload,
} from 'src/domain/shared/event-payload.types';
import { ProducerUserMessageService } from 'src/infrastructure/publishers/user.publisher';

@Injectable()
export class UserListener {
  constructor(
    private readonly producerUserMessageService: ProducerUserMessageService,
    private readonly userPreferencesService: UserPreferencesService,
  ) {}
  @OnEvent('user.created')
  handleUserCreated(payload: UserCreatedEventPayload) {
    this.userPreferencesService.generate(payload.profileId);
    this.producerUserMessageService.pushToUserQueue({
      profile_id: payload.profileId,
      username: '',
      avatar: null,
      action: 'create',
    });
  }
  @OnEvent('user.updated')
  handleUserUpdate(payload: any) {
    this.producerUserMessageService.pushToUserQueue({
      profile_id: payload.profileId,
      username: payload.username,
      avatar: payload.avatar,
      action: 'update',
    });
  }
  @OnEvent('user.deleted')
  handleUserDelete(payload: UserDeletedEventPayload) {
    this.producerUserMessageService.pushToUserQueue({
      profile_id: payload.profileId,
      action: 'delete',
    });
  }
}
