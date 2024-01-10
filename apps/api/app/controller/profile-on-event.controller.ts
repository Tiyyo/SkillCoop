import UserInputError from '../helpers/errors/user-input.error.js';
import { profileOnEvent as ProfileOnEvent } from '../models/index.js';
import { event as Event } from '../models/index.js';
import { Request, Response } from 'express';
import { invitationStatus } from '@skillcoop/types';
import { generateBalancedTeam } from '../service/generate-teams/index.js';
import deleteDecodedKey from '../utils/delete-decoded.js';
//eslint-disable-next-line
import { notifyUserHasBeenInvitedToEvent } from '../service/notification/subtype/user-invited-event.js';
//eslint-disable-next-line
import { notifyTeamHasBeenGenerated } from '../service/notification/subtype/team-generated.js';

export default {
  async updateStatus(req: Request, res: Response) {
    deleteDecodedKey(req.body);

    const { profile_id, event_id, status_name } = req.body;
    let userMessage = 'Status has been updated';

    const data = { profile_id, event_id, status_name, updated_at: undefined };
    const event = await Event.findOne({ id: data.event_id });

    if (!event) throw new UserInputError('Event not found');

    if (status_name === 'pending' || status_name === 'declined') {
      if (event.organizer_id === profile_id) {
        return res
          .status(200)
          .json({ message: 'Organizer cannot change his status' });
      }
      if (event.status_name === 'completed') {
        return res.status(200).json({ message: 'Event is already completed' });
      }
      if (event.status_name === 'full') {
        await Event.updateOne({ id: event.id }, { status_name: 'open' });
      }
      await ProfileOnEvent.updateStatus(data);
      return res.status(200).send(userMessage);
    }

    // check if the event is full
    const confirmedParticipants = await ProfileOnEvent.find({
      event_id: data.event_id,
      status_name: invitationStatus.confirmed,
    });
    if (!confirmedParticipants)
      throw new UserInputError('Could not find participant');

    if (event.required_participants <= confirmedParticipants.length) {
      throw new UserInputError('Event is already full');
    }

    await ProfileOnEvent.updateStatus(data);

    if (event.required_participants === confirmedParticipants.length + 1) {
      await Event.updateOne({ id: event.id }, { status_name: 'full' });
      await generateBalancedTeam(event.id);
      await notifyTeamHasBeenGenerated(event.id);
      userMessage = 'Teams has been generated ';
    }

    res.status(200).json(userMessage);
  },
  async sendInvitationToEvent(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { ids, event_id, initiator: profile_id } = req.body;

    const data = ids.map((id: number) => ({
      profile_id: id,
      event_id,
      status_name: 'pending',
    }));
    const isCreated = await ProfileOnEvent.createMany(data);
    notifyUserHasBeenInvitedToEvent(event_id, profile_id, ids);
    res.status(201).send({ success: isCreated });
  },
};
