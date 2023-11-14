import { Response } from 'express';

const mockResponse = () => {
  const res = {} as Response;
  res.cookie = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

export { mockResponse };
