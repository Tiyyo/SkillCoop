import bestStrikerController from '../best-striker.controller';
import { mockResponse } from "./mock-response"
import { Request } from 'express';
import { bestStriker as BestStriker } from '../../models/index';
import { event as Event } from '../../models/index';
import * as  deleteDecodedKey from '../../utils/delete-decoded';

const { createOne } = bestStrikerController;

describe('createOne', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  const deleteDecodedKeySpy = vi.spyOn(deleteDecodedKey, 'default')
  const mockReq = {
    body: {
      profile_id: 1,
      rater_id: 2,
      event_id: 3
    }
  }
  test('should return 201 when best striker is created', async () => {
    const res = mockResponse()
    const req = mockReq as Request
    Event.getEventById = vi.fn().mockResolvedValue({ status_name: 'completed' })
    BestStriker.create = vi.fn().mockResolvedValue(true)
    Event.updateBestStriker = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(res.status).toBeCalledWith(201)

  });
  test('should return a json with success true when best striker is created', async () => {
    const res = mockResponse()
    const req = mockReq as Request
    Event.getEventById = vi.fn().mockResolvedValue({ status_name: 'completed' })
    BestStriker.create = vi.fn().mockResolvedValue(true)
    Event.updateBestStriker = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(res.json).toBeCalledWith(expect.objectContaining({ success: true }))
  });
  test('should call deleteDecodedKey with the correct params', () => {
    const mockReq = {
      body: {
        profile_id: 1,
        rater_id: 2,
        event_id: 3
      }
    }
  });
  test('should call getEventById with the correct params', async () => {
    const res = mockResponse()
    const req = mockReq as Request
    Event.getEventById = vi.fn().mockResolvedValue({ status_name: 'completed' })
    BestStriker.create = vi.fn().mockResolvedValue(true)
    Event.updateBestStriker = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(Event.getEventById).toBeCalledWith(3, 1)
  });
  test('should throw a NotFoundError if event is not found', async () => {
    const res = mockResponse()
    const req = mockReq as Request
    Event.getEventById = vi.fn().mockResolvedValue(null)

    await expect(async () => createOne(req, res)).rejects.toThrowError('Event not found or not completed')
  });
  test('should call create bestStriker with the correct params', async () => {
    const res = mockResponse()
    const req = mockReq as Request
    Event.getEventById = vi.fn().mockResolvedValue({ status_name: 'completed' })
    BestStriker.create = vi.fn().mockResolvedValue(true)
    Event.updateBestStriker = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(BestStriker.create).toBeCalledWith({ profile_id: 1, rater_id: 2, event_id: 3 })
  });
  test('should throw an error if bestStriker is not created', async () => {
    const res = mockResponse()
    const req = mockReq as Request
    Event.getEventById = vi.fn().mockResolvedValue({ status_name: 'completed' })
    BestStriker.create = vi.fn().mockResolvedValue(false)

    await expect(async () => createOne(req, res)).rejects.toThrowError('Not created')
  });
  test('should call updateBestStriker with the correct params', async () => {
    const res = mockResponse()
    const req = mockReq as Request
    Event.getEventById = vi.fn().mockResolvedValue({ status_name: 'completed' })
    BestStriker.create = vi.fn().mockResolvedValue(true)
    Event.updateBestStriker = vi.fn().mockResolvedValue(true)

    await createOne(req, res)
    expect(Event.updateBestStriker).toBeCalledWith(3)
  });
}); 