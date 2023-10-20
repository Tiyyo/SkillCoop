import eventController from '../event.controller';
import { mockResponse } from './mock-response';
import { Request } from 'express';
import { event as Event } from '../../models/index';
import { profileOnEvent as ProfileOnEvent } from '../../models/index';

const {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAllByUser,
  getOrganizerEvents,
  getPasts,
} = eventController;

describe('createOne', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  test('should return 201 when event is created', async () => {
    const res = mockResponse()
    const mockRequest = {
      body: {
        ids: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,

      }
    } as Request
    const req = mockRequest
    Event.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(res.status).toBeCalledWith(201)
  });
  test('should return a json with success true when event is created', async () => {
    const res = mockResponse()
    const mockRequest = {
      body: {
        ids: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,

      }
    } as Request
    const req = mockRequest
    Event.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(res.json).toBeCalledWith(expect.objectContaining({ success: true }))
  });
  test('should call create event with the correct params', async () => {
    const res = mockResponse()
    const mockRequest = {
      body: {
        participants: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,

      }
    } as Request
    const req = mockRequest
    Event.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(Event.create).toBeCalledWith({
      location: 'test',
      organizer_id: 1,
      date: '2021-10-10',
      duration: 60,
    })
  });
  test('should call create profileOnEvent for organizer', async () => {
    const res = mockResponse()
    const mockRequest = {
      body: {
        participants: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,

      }
    } as Request
    const req = mockRequest
    Event.create = vi.fn().mockResolvedValue(7)
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(ProfileOnEvent.create).toBeCalledWith({ event_id: 7, profile_id: 1, status_name: 'confirmed' })
  });
  test('should call createMany profileOnEvent for participants', async () => {
    const res = mockResponse()
    const mockRequest = {
      body: {
        participants: [2, 3],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,

      }
    } as Request
    const req = mockRequest
    Event.create = vi.fn().mockResolvedValue(7)
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true)
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(ProfileOnEvent.createMany).toBeCalledWith([
      { event_id: 7, profile_id: 2, status_name: 'pending' },
      { event_id: 7, profile_id: 3, status_name: 'pending' },
    ])
  });
});