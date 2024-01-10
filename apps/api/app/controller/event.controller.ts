import { event as Event } from '../models/index.js';
import { profileOnEvent as ProfileOnEvent } from '../models/index.js';
import { Request, Response } from 'express';
import AuthorizationError from '../helpers/errors/unauthorized.error.js';
import checkParams from '../utils/check-params.js';
import NotFoundError from '../helpers/errors/not-found.error.js';
import deleteDecodedKey from '../utils/delete-decoded.js';
import { generateBalancedTeam } from '../service/generate-teams/index.js';
/*eslint-disable*/
import { notifyEventInfosHasBeenUpdated } from '../service/notification/subtype/infos-event.js';
import { notifyUserHasBeenInvitedToEvent } from '../service/notification/subtype/user-invited-event.js';
import { notifyTransfertOwnership } from '../service/notification/subtype/transfert-ownership.js';
/*eslint-enable*/
import ForbidenError from '../helpers/errors/forbiden.js';
import ServerError from '../helpers/errors/server.error.js';

export default {
  async createOne(req: Request, res: Response) {
    // create one event
    // add organizer to the event
    // add organizer to the participant list
    deleteDecodedKey(req.body);
    const { participants: ids, ...data } = req.body;

    const event = await Event.create({
      organizer_id: data.organizer_id,
      status_name: 'open',
      date: data.date,
      duration: data.duration,
      location: data.location,
      required_participants: data.required_participants,
    });
    if (!event) throw new ServerError('Failed to create event');

    await ProfileOnEvent.createOne({
      event_id: event.id,
      profile_id: data.organizer_id,
      status_name: 'confirmed',
    });

    if (ids) {
      const participantsToInvite = ids.map((id: number) => {
        return {
          profile_id: id,
          event_id: event.id,
          status_name: 'pending',
        };
      });
      await ProfileOnEvent.createMany(participantsToInvite);
      notifyUserHasBeenInvitedToEvent(event.id, data.organizer_id, ids);
      // send notification to invited users here
    }
    res.status(201).json({
      success: true,
    });
  },
  async getOne(req: Request, res: Response) {
    const [eventId, profileId] = checkParams(
      req.params.eventId,
      req.params.profileId,
    );
    const event = await Event.getEventById(eventId, profileId);
    res.status(200).json(event);
  },
  async updateOne(req: Request, res: Response) {
    // update one event
    // only the organize can update the event
    deleteDecodedKey(req.body);
    const { event_id, profile_id, ...data } = req.body;
    const event = await Event.findOne({ id: event_id });
    const possibleFieldsUpdated = [
      'date',
      'duration',
      'location',
      'required_participants',
      'status_name',
    ];

    if (!event || event.organizer_id !== profile_id)
      throw new ForbidenError(
        'Operation not allowed : you are not the organizer',
        'Operation not allowed',
        'event.controller updateOne',
        '63',
      );

    const dataHasChange = possibleFieldsUpdated.some((field) => {
      return data[field] !== event[field as keyof typeof event];
    });

    if (!dataHasChange)
      return res.status(201).json({
        message: 'Nothing to update',
      });
    const isUpdated = await Event.updateOne({ id: event_id }, data);

    notifyEventInfosHasBeenUpdated(event_id);

    res.status(204).json({
      success: isUpdated,
    });
  },
  async updateOrganizer(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { event_id, organizer_id, new_organizer_id } = req.body;

    const event = await Event.findOne({ id: event_id });
    if (!event || event.organizer_id !== organizer_id)
      throw new ForbidenError(
        'Operation not allowed : you are not the organizer',
        'Operation not allowed',
        'event.controller updateOne',
        '63',
      );

    const isUpdated = await Event.updateOne(
      { id: event_id },
      {
        organizer_id: new_organizer_id,
      },
    );

    if (isUpdated) {
      await notifyTransfertOwnership(event_id, organizer_id, new_organizer_id);
    }

    res.status(204).json({
      success: isUpdated,
    });
  },
  async deleteOne(req: Request, res: Response) {
    // delete one event
    // only the organizer can delete the event
    const [eventId, profileId] = checkParams(
      req.params.id,
      req.params.profileId,
    );

    const event = await Event.findOne({ id: eventId });

    if (!event) throw new NotFoundError('No event');
    if (event.organizer_id !== profileId)
      throw new AuthorizationError('Operation not allowed');

    const isDeleted = await Event.deleteOne({ id: eventId });

    res.status(204).json({
      success: isDeleted,
    });
  },
  async getAllByUser(req: Request, res: Response) {
    const [profileId] = checkParams(req.params.profileId);
    const events = await Event.getEventByUserId(profileId);

    res.status(200).json(events);
  },
  async getOrganizerEvents(req: Request, res: Response) {
    const [profileId, page] = checkParams(req.query.profileId, req.query.page);
    const events = await Event.getOrganizerEvents(profileId, page);

    res.status(200).json(events);
  },
  async getPasts(req: Request, res: Response) {
    const [profileId, page] = checkParams(req.query.profileId, req.query.page);
    const events = await Event.getPastEvents(profileId, page);

    res.status(200).json(events);
  },
  async getUpcoming(req: Request, res: Response) {
    const [profileId, page] = checkParams(req.query.profileId, req.query.page);
    const events = await Event.getUpcomingEvents(profileId, page);

    res.status(200).json(events);
  },
  async generateTeams(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { eventId } = req.body;

    await generateBalancedTeam(eventId);
    res.status(200).json({
      success: true,
    });
  },
};
