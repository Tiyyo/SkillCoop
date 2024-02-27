import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateEventDTO } from 'src/application/dto/create-event.dto';
import { DeleteEventDTO } from 'src/application/dto/delete-event.dto';
import { SaveScoreEventDTO } from 'src/application/dto/save-score.dto';
import { UpdateEventDTO } from 'src/application/dto/update-event.dto';
import { UpdateEventOrganizerDTO } from 'src/application/dto/update-organizer-event.dto';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { RessourceNotFoundException } from 'src/application/exceptions/ressource-not-found.exception';
import { EmitEventInterface } from 'src/application/services/event.service';
import { ScoreAdapter } from 'src/domain/repositories/score.repository';
import { EventParticipantService } from 'src/domain/services/event-participant/event-participant.service';
import { EventStatusAdjusterService } from 'src/domain/services/event/event-status-adjuster.service';
import { GenerateTeamService } from 'src/domain/services/generate-teams/generate-team.service';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
const possibleFieldsUpdated = [
  'date',
  'duration',
  'location',
  'required_participants',
  'status_name',
  'visibility',
  'price',
];

@Injectable()
export class EventMutationUsecases {
  constructor(
    private readonly eventMutationAdapter: EventMutationsAdapter,
    private readonly scoreAdapter: ScoreAdapter,
    private readonly eventParticipantService: EventParticipantService,
    private readonly eventStatusAdjusterService: EventStatusAdjusterService,
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly generateTeamService: GenerateTeamService,
    @Inject('EmitEventService') private eventEmitter: EmitEventInterface,
  ) { }
  async createOne(data: CreateEventDTO) {
    const eventData = {
      organizer_id: data.organizer_id,
      status_name: 'open',
      date: data.date,
      duration: data.duration,
      location_id: data.location_id,
      required_participants: data.required_participants,
      visibility: data.visibility,
      price: data.price,
    };

    const { id: eventId } = await this.eventMutationAdapter.create(eventData);

    if (!eventId) {
      throw new ApplicationException(
        'Failed to create event',
        'EventMutationUsecases',
      );
    }
    await this.eventParticipantService.addParticipant(
      eventId,
      data.organizer_id,
    );
    await this.eventParticipantService.inviteParticipant(
      eventId,
      data.participants,
    );
    this.eventEmitter.eventCreated({
      eventId: eventId,
      participantsIds: data.participants,
      organizerId: data.organizer_id,
    });
  }
  async updateOne(data: UpdateEventDTO) {
    const { event_id } = data;
    const event = await this.eventMutationAdapter.findOne({ id: event_id });
    if (!event) {
      throw new RessourceNotFoundException(
        'Could not find event to update',
        'EventMutationUsecases',
      );
    }
    if (event.organizer_id !== data.profile_id) {
      throw new ForbiddenException(
        'Operation not allowed : you are not the organizer',
        'EventMutationUsecases',
      );
    }
    const dataHasChange = possibleFieldsUpdated.some((field) => {
      return data[field] !== event[field as keyof typeof event];
    });
    if (!dataHasChange)
      return {
        message: 'Nothing to update',
      };
    const confirmedParticipants = await this.eventParticipantAdapter.find({
      event_id,
      status_name: 'confirmed',
    });
    const adjustedUpdateData = this.eventStatusAdjusterService.data(
      data,
      event,
      confirmedParticipants,
    );
    await this.eventMutationAdapter.updateOne(
      { id: event_id },
      adjustedUpdateData,
    );
    if (adjustedUpdateData.status_name === 'full') {
      this.generateTeamService.generate(event.id);
    }
    this.eventEmitter.eventUpdated({ eventId: event_id });
    return { message: 'Event updated' };
  }
  async deleteOne(data: DeleteEventDTO) {
    const event = await this.eventMutationAdapter.findOne({ id: data.eventId });
    if (!event) {
      throw new RessourceNotFoundException(
        'Could not find event to delete',
        'EventMutationUsecases',
      );
    }
    if (event.organizer_id !== data.profileId) {
      throw new ForbiddenException(
        'Operation not allowed : you are not the organizer',
        'EventMutationUsecases',
      );
    }
    const isDeleted = await this.eventMutationAdapter.deleteOne({
      id: data.eventId,
    });
    this.eventEmitter.eventDeleted({
      eventId: data.eventId,
      organizerId: data.profileId,
    });
    return { success: isDeleted };
  }
  async saveScore(data: SaveScoreEventDTO) {
    await this.scoreAdapter.createOne(data);
    await this.eventMutationAdapter.updateOne(
      {
        id: data.event_id,
      },
      { status_name: 'completed' },
    );
  }
  async updateOrganizer(data: UpdateEventOrganizerDTO) {
    const event = await this.eventMutationAdapter.findOne({
      id: data.event_id,
    });
    if (!event) {
      throw new RessourceNotFoundException(
        'Could not find event to update organizer',
        'EventMutationUsecases',
      );
    }
    await this.eventMutationAdapter.updateOne(
      { id: data.event_id },
      { organizer_id: data.new_organizer_id },
    );
    // TODO :notify change organizer here
  }
}
