import { mockResponse } from './mock-response.js';
import authController from '../auth.controller.js';
import { Request } from 'express';
import authService from '../../service/auth/auth.js';
import emailService from '../../utils/send-email.js';
import google from '../../service/auth/google.js';

const { register, signin } = authController;

describe('AuthController', () => {
  describe('register', () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    const mockRequest = {
      body: {
        email: 'test@test.com',
        password: '123456',
      },
    } as Request;

    google.getOAuthToken = vi.fn().mockResolvedValue(true);
    google.getUser = vi.fn().mockResolvedValue(true);

    test.skip('should return 201 when user is created', async () => {
      const res = mockResponse();
      const req = mockRequest;
      authService.createUser = vi.fn().mockResolvedValue(true);
      emailService.sendVerify = vi.fn().mockResolvedValue(true);
      await register(req, res);
      expect(res.status).toBeCalledWith(201);
    });
    test.skip(`should call createUser
      service with correct params`, async () => {
      const res = mockResponse();
      const req = mockRequest;
      authService.createUser = vi.fn().mockResolvedValue(true);
      emailService.sendVerify = vi.fn().mockResolvedValue(true);
      await register(req, res);
      expect(authService.createUser).toBeCalledWith(mockRequest.body);
    });
    test.skip('should return true if user is created ', async () => {
      const res = mockResponse();
      const req = mockRequest;
      authService.createUser = vi.fn().mockResolvedValue(true);
      emailService.sendVerify = vi.fn().mockResolvedValue(true);
      await register(req, res);
      expect(res.json).toBeCalledWith(true);
    });
    test.skip('should call create token with the correct params', async () => {
      // const res = mockResponse()
      // const mockRequest
      // authService.createUser = vi.fn().mockResolvedValue({ id: 1 })
      // await register(req, res)
      // expect(createAccessToken).toBeCalledWith('1h', { userId: 1 })
    });
    test.skip('should send verify email with th correct params', async () => {
      // const res = mockResponse()
      // const req = mockRequest
      // authService.createUser = vi.fn().mockResolvedValue({ id: 1 })
      // emailService.sendVerify = vi.fn().mockResolvedValue(true)
      // await register(req, res)
      // expect(emailService.sendVerify)
      //.toBeCalledWith(req.email, 'validate your email', expect.toBe(string))
    });
  });
  describe('signin', () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    const mockRequest = {
      body: {
        email: 'john.doe@example.com',
        password: '123456',
      },
    } as Request;

    test.skip('should return 200 when user is logged in', async () => {
      const res = mockResponse();
      const req = mockRequest;
      authService.login = vi.fn().mockResolvedValue(true);
      await signin(req, res);
      expect(res.status).toBeCalledWith(200);
    });
    test.skip('should call login service with correct params', async () => {
      const res = mockResponse();
      const req = mockRequest;
      authService.login = vi.fn().mockResolvedValue(true);
      await signin(req, res);
      expect(authService.login).toBeCalledWith(mockRequest.body);
    });
    test.skip('should return accesToken if user is logged in', async () => {
      const res = mockResponse();
      const req = mockRequest;
      authService.login = vi.fn().mockResolvedValue({
        accessToken: 'validAccessToken',
        refreshToken: 'validRefreshToken',
      });
      await signin(req, res);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({ accessToken: expect.any(String) }),
      );
    });
    test.skip(`should set refreshToken 
      cookie if user is logged in`, async () => {
      const res = mockResponse();
      const req = mockRequest;
      authService.login = vi.fn().mockResolvedValue({
        accessToken: 'validAccessToken',
        refreshToken: 'validRefreshToken',
      });
      await signin(req, res);
      expect(res.cookie).toBeCalledWith('refreshToken', 'validRefreshToken', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    });
  });
  describe('refresh', () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    test.skip('should return 200 when token is refreshed', async () => {
      // test skipped
    });
    test.skip(`should return accesToken
      if token is refreshed`, async () => {
      // test skipped
    });
    test.skip(`should call createAccesToken
      with correct params`, async () => {
      // test skipped
    });
  });
});
