import {
  type InvitationStatus,
  invitationStatus,
  type EventWithoutAggr,
} from '@skillcoop/types';
import { ProfileOnEvent } from '../models/profile_on_event.js';
import { EventStatusEvaluator } from './event-state.service.js';
import { generateBalancedTeam } from './generate-teams/index.js';
import { event } from '../models/index.js';
/*eslint-disable-next-line */
import { participantQueuePublisher } from '../publishers/participant.publisher.js';

type EventCurrentState = 'open' | 'oneSpotLeft' | 'full' | 'notFound';

export class ParticipantStatusManager {
  isAdmin: boolean;
  updateStatus: InvitationStatus;
  participant: ProfileOnEvent;
  event: EventWithoutAggr;
  profileId: number;
  declare eventState: EventCurrentState;

  constructor(
    participant: ProfileOnEvent,
    event: EventWithoutAggr,
    updateStatus: InvitationStatus,
    profileId: number,
  ) {
    this.profileId = profileId;
    this.updateStatus = updateStatus;
    this.participant = participant;
    this.event = event;
    this.isAdmin = profileId === event.organizer_id;
  }
  private async init() {
    const eventState = await new EventStatusEvaluator(this.event).status();
    this.eventState = eventState;
  }
  async manage() {
    await this.init();
    switch (this.updateStatus) {
      case invitationStatus.pending:
        return await this.shouldPending();
      case invitationStatus.declined:
        return await this.shouldDeclined();
      case invitationStatus.confirmed:
        return await this.shouldConfirmed();
    }
  }
  async shouldPending() {
    if (this.isAdmin) {
      return 'Organizer cannot change his status';
    }
    if (this.event.status_name === 'completed') {
      return 'Event has already taken place';
    }
    if (this.event.status_name === 'full') {
      await event.updateOne({ id: this.event.id }, { status_name: 'open' });
    }
    await this.participant.updateStatus({
      event_id: this.event.id,
      status_name: 'pending',
      profile_id: this.profileId,
      updated_at: undefined,
    });
    return 'Status has been updated';
  }
  async shouldConfirmed() {
    if (this.eventState === 'open') {
      await this.participant.updateStatus({
        profile_id: this.profileId,
        event_id: this.event.id,
        status_name: this.updateStatus,
        updated_at: undefined,
      });
      return 'Status has been updated';
    }
    if (this.eventState === 'oneSpotLeft') {
      await event.updateOne({ id: this.event.id }, { status_name: 'full' });
      await generateBalancedTeam(this.event.id);
      return 'Teams has been generated ';
    }
    if (this.eventState === 'full') {
      return 'Event is already full';
    }
    return 'Could not find event';
  }
  async shouldDeclined() {
    if (this.isAdmin) {
      return 'Organizer cannot change his status';
    }
    if (this.event.status_name === 'completed') {
      return 'Event has already taken place';
    }
    if (this.event.status_name === 'full') {
      await event.updateOne({ id: this.event.id }, { status_name: 'open' });
    }
    await this.participant.updateStatus({
      event_id: this.event.id,
      status_name: 'pending',
      profile_id: this.profileId,
      updated_at: undefined,
    });
    await participantQueuePublisher({
      event_id: this.event.id,
      participants_id: [this.profileId],
      action: 'remove_participant',
    });
    return 'Status has been updated';
  }
}
