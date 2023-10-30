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

describe.skip('createOne', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('should return 201 when event is created', async () => {
    const res = mockResponse();
    const mockRequest = {
      body: {
        ids: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,
      },
    } as Request;
    const req = mockRequest;
    Event.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true);

    await createOne(req, res);
    expect(res.status).toBeCalledWith(201);
  });
  test(`should return a json with success true
        when event is created`, async () => {
    const res = mockResponse();
    const mockRequest = {
      body: {
        ids: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,
      },
    } as Request;
    const req = mockRequest;
    Event.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true);

    await createOne(req, res);
    expect(res.json).toBeCalledWith(expect.objectContaining({ success: true }));
  });
  test('should call create event with the correct params', async () => {
    const res = mockResponse();
    const mockRequest = {
      body: {
        participants: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,
      },
    } as Request;
    const req = mockRequest;
    Event.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true);

    await createOne(req, res);
    expect(Event.create).toBeCalledWith({
      location: 'test',
      organizer_id: 1,
      date: '2021-10-10',
      duration: 60,
    });
  });
  test('should call create profileOnEvent for organizer', async () => {
    const res = mockResponse();
    const mockRequest = {
      body: {
        participants: [2, 3, 4, 5, 6],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,
      },
    } as Request;
    const req = mockRequest;
    Event.create = vi.fn().mockResolvedValue(7);
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true);

    await createOne(req, res);
    expect(ProfileOnEvent.create).toBeCalledWith({
      event_id: 7,
      profile_id: 1,
      status_name: 'confirmed',
    });
  });
  test('should call createMany profileOnEvent for participants', async () => {
    const res = mockResponse();
    const mockRequest = {
      body: {
        participants: [2, 3],
        location: 'test',
        organizer_id: 1,
        date: '2021-10-10',
        duration: 60,
      },
    } as Request;
    const req = mockRequest;
    Event.create = vi.fn().mockResolvedValue(7);
    ProfileOnEvent.create = vi.fn().mockResolvedValue(true);
    ProfileOnEvent.createMany = vi.fn().mockResolvedValue(true);

    await createOne(req, res);
    expect(ProfileOnEvent.createMany).toBeCalledWith([
      { event_id: 7, profile_id: 2, status_name: 'pending' },
      { event_id: 7, profile_id: 3, status_name: 'pending' },
    ]);
  });
});
describe.skip('getOne', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const mockRequest = {
    params: {
      eventId: 1,
      profileId: 2,
    },
  };
  const req = mockRequest;
  test('should return 200 when event is found', async () => {
    const res = mockResponse();
    Event.getEventById = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await getOne(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should return a json with an event when event is found', async () => {
    const res = mockResponse();
    Event.getEventById = vi.fn().mockResolvedValue({
      id: 1,
      location: 'test',
      organizer_id: 2,
      date: '2021-10-10',
      duration: 60,
    });
    //@ts-ignore
    await getOne(req, res);
    expect(res.json).toBeCalledWith({
      id: 1,
      location: 'test',
      organizer_id: 2,
      date: '2021-10-10',
      duration: 60,
    });
  });
  test('should call getEventById with the correct params', async () => {
    const res = mockResponse();
    Event.getEventById = vi.fn().mockResolvedValue({
      id: 1,
      location: 'test',
      organizer_id: 2,
      date: '2021-10-10',
      duration: 60,
    });
    //@ts-ignore
    await getOne(req, res);
    expect(Event.getEventById).toBeCalledWith(1, 2);
  });
});
describe.skip('updateOne', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const mockRequest = {
    body: {
      event_id: 1,
      profile_id: 2,
      location: 'test',
      duration: 90,
    },
  } as Request;
  test('should return 204 when event is updated', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.update = vi.fn().mockResolvedValue(true);

    await updateOne(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test(`should return a json with
        success true when event is updated`, async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.update = vi.fn().mockResolvedValue(true);

    await updateOne(req, res);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('should call find event by pk with the correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.update = vi.fn().mockResolvedValue(true);

    await updateOne(req, res);
    expect(Event.findByPk).toBeCalledWith(req.body.event_id);
  });
  test('should throw an AuthorizationError if event is not found', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue(null);
    Event.update = vi.fn().mockResolvedValue(true);

    await expect(async () => updateOne(req, res)).rejects.toThrowError(
      'Operation not allowed',
    );
  });
  test('should call event update with the correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.update = vi.fn().mockResolvedValue(true);

    await updateOne(req, res);
    expect(Event.update).toBeCalledWith(req.body.event_id, {
      location: 'test',
      duration: 90,
    });
  });
});
describe.skip('deleteOne', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const mockRequest = {
    params: {
      id: 1,
      profileId: 2,
    },
  };
  test('should return 204 when event has been deleted', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.delete = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await deleteOne(req, res);
    expect(res.status).toBeCalledWith(204);
  });
  test(`should return a json with success true
      when event has been deleted`, async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.delete = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await deleteOne(req, res);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('should call find event by pk with the correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.delete = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await deleteOne(req, res);
    expect(Event.findByPk).toBeCalledWith(req.params.id);
  });
  test('should throw an Error No event if not event is found', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue(null);
    Event.delete = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await expect(async () => deleteOne(req, res)).rejects.toThrowError(
      'No event',
    );
  });
  test(`should throw an AuthorizationError
if organizer is not equal to profileId`, async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organier_id: 3 });
    Event.delete = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await expect(async () => deleteOne(req, res)).rejects.toThrowError(
      'Operation not allowed',
    );
  });
  test('should call event delete with the correct params', async () => {
    const res = mockResponse();
    const req = mockRequest;
    Event.findByPk = vi.fn().mockResolvedValue({ organizer_id: 2 });
    Event.delete = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await deleteOne(req, res);
    expect(Event.delete).toBeCalledWith(req.params.id);
  });
});
describe.skip('getAllByUser', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const mockRequest = {
    params: {
      profileId: 1,
    },
  };
  const req = mockRequest;
  test('should return 200 when events are found', async () => {
    const res = mockResponse();
    Event.getEventByUserId = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await getAllByUser(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should return a json with events when events are found', async () => {
    const res = mockResponse();
    Event.getEventByUserId = vi.fn().mockResolvedValue([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
    //@ts-ignore
    await getAllByUser(req, res);
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
  });
  test('should call getEventByUserId with the correct params', async () => {
    const res = mockResponse();
    Event.getEventByUserId = vi.fn().mockResolvedValue([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
    //@ts-ignore
    await getAllByUser(req, res);
    expect(Event.getEventByUserId).toBeCalledWith(1);
  });
});
describe.skip('getOrganizerEvents', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const mockRequest = {
    query: {
      profileId: 1,
      page: 1,
    },
  };
  const req = mockRequest;
  test('should return 200 when events are found', async () => {
    const res = mockResponse();
    Event.getOrganizerEvents = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await getOrganizerEvents(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should return a json with events when events are found', async () => {
    const res = mockResponse();
    Event.getOrganizerEvents = vi.fn().mockResolvedValue([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
    //@ts-ignore
    await getOrganizerEvents(req, res);
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
  });
  test('should call getOrganizerEvents with the correct params', async () => {
    const res = mockResponse();
    Event.getOrganizerEvents = vi.fn().mockResolvedValue([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
    //@ts-ignore
    await getOrganizerEvents(req, res);
    expect(Event.getOrganizerEvents).toBeCalledWith(1, 1);
  });
});
describe.skip('getPasts', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const mockRequest = {
    query: {
      profileId: 1,
      page: 1,
    },
  };
  const req = mockRequest;
  test('should return 200 when events are found', async () => {
    const res = mockResponse();
    Event.getPastEvents = vi.fn().mockResolvedValue(true);
    //@ts-ignore
    await getPasts(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('should return a json with events when events are found', async () => {
    const res = mockResponse();
    Event.getPastEvents = vi.fn().mockResolvedValue([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
    //@ts-ignore
    await getPasts(req, res);
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
  });
  test('should call getPastEvents with the correct params', async () => {
    const res = mockResponse();
    Event.getPastEvents = vi.fn().mockResolvedValue([
      {
        id: 1,
        location: 'test',
        organizer_id: 2,
        date: '2021-10-10',
        duration: 60,
      },
    ]);
    //@ts-ignore
    await getPasts(req, res);
    expect(Event.getPastEvents).toBeCalledWith(1, 1);
  });
});
