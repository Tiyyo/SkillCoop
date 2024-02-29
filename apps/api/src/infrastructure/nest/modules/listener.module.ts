import { Module } from '@nestjs/common';
import { EventListener } from 'src/application/listeners/event.listener';
import { FriendListener } from 'src/application/listeners/friend.listener';
import { ParticipantListener } from 'src/application/listeners/participant.listener';
import { UserListener } from 'src/application/listeners/user.listener';
import { NotificationBuilderMessageService } from 'src/domain/services/notification/notification-builder-message.service';
import { NotificationDispatchService } from 'src/domain/services/notification/notification-dispatch.service';
import { InfosNotificationService } from 'src/domain/services/notification/notification-infos.service';
import { NotificationPipelineService } from 'src/domain/services/notification/notification-pipeline.service';
import { NotificationService } from 'src/domain/services/notification/notification.service';
import { SubscriberService } from 'src/domain/services/notification/subscriber.service';
import { AddedFriendNotificationService } from 'src/domain/services/notification/subtype/added-friend.notification.service';
import { FriendRequestNotificationService } from 'src/domain/services/notification/subtype/friend-request.notification.service';
import { InvitedEventNotificationService } from 'src/domain/services/notification/subtype/invited-event.notification.service';
import { TeamGeneratedNotificationService } from 'src/domain/services/notification/subtype/team-generated.notification.service';
import { UpdatedEventInfosNotificationService } from 'src/domain/services/notification/subtype/updated-event-infos.notification.service';
import { UserTransportNotificationService } from 'src/domain/services/notification/user-transport-notification.service';
import { LanguagePreferenceService } from 'src/domain/services/user-prefrerences/language-preference.service';
import { NotificationPreferenceService } from 'src/domain/services/user-prefrerences/notification-preference.service';
import { ThemePreferenceService } from 'src/domain/services/user-prefrerences/theme-preference.service';
import { UserPreferencesService } from 'src/domain/services/user-prefrerences/user-preferences.service';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { LanguagePreferenceAdapter } from 'src/infrastructure/kysely/adapters/language-preference.adapter';
import { NotificationPreferenceAdapter } from 'src/infrastructure/kysely/adapters/notification-preference.adapter';
import { NotificationTypeAdapter } from 'src/infrastructure/kysely/adapters/notification-type.adapter';
import { NotificationAdapter } from 'src/infrastructure/kysely/adapters/notification.adapter';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { ThemePreferenceAdapter } from 'src/infrastructure/kysely/adapters/theme-preference.adapter';
import { UserPreferencesAdapter } from 'src/infrastructure/kysely/adapters/user-preferences.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { ProducerEventMessageService } from 'src/infrastructure/publishers/event.publisher';
import { ProducerParticipantMessageService } from 'src/infrastructure/publishers/participant.publisher';
import { ProducerUserMessageService } from 'src/infrastructure/publishers/user.publisher';

@Module({
  controllers: [],
  providers: [
    databaseProvider,
    EventListener,
    FriendListener,
    UserListener,
    ParticipantListener,
    ProfileAdapter,
    EventParticipantAdapter,
    EventQueriesAdapter,
    NotificationAdapter,
    NotificationPreferenceAdapter,
    NotificationTypeAdapter,
    UserPreferencesAdapter,
    LanguagePreferenceAdapter,
    ThemePreferenceAdapter,
    TeamGeneratedNotificationService,
    NotificationDispatchService,
    NotificationPipelineService,
    SubscriberService,
    InfosNotificationService,
    NotificationService,
    NotificationBuilderMessageService,
    UserTransportNotificationService,
    InvitedEventNotificationService,
    UpdatedEventInfosNotificationService,
    AddedFriendNotificationService,
    FriendRequestNotificationService,
    NotificationPreferenceService,
    ProducerEventMessageService,
    ProducerUserMessageService,
    ProducerParticipantMessageService,
    UserPreferencesService,
    LanguagePreferenceService,
    ThemePreferenceService,
  ],
})
export class ListenerModule {}
