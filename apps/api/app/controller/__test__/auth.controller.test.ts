import { mockResponse } from "./mock-response"
import authController from "../auth.controller"
import { Request } from "express"
import authService from "../../service/auth/auth"
import emailService from "../../utils/send-email"

const { register, signin } = authController


describe('AuthController', () => {
  describe('register', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })
    const mockRequest = {
      body: {
        email: 'test@test.com',
        password: '123456'
      }
    } as Request

    test('should return 201 when user is created', async () => {
      const res = mockResponse()
      const req = mockRequest
      authService.createUser = vi.fn().mockResolvedValue(true)
      emailService.sendVerify = vi.fin().mockResolvedValue()
      await register(req, res)
      expect(res.status).toBeCalledWith(201)
    })
    test('should call createUser service with correct params', async () => {
      const res = mockResponse()
      const req = mockRequest
      authService.createUser = vi.fn().mockResolvedValue(true)
      emailService.sendVerify = vi.fin().mockResolvedValue()
      await register(req, res)
      expect(authService.createUser).toBeCalledWith(mockRequest.body)
    })
    test('should return true if user is created ', async () => {
      const res = mockResponse()
      const req = mockRequest
      authService.createUser = vi.fn().mockResolvedValue(true)
      emailService.sendVerify = vi.fin().mockResolvedValue()
      await register(req, res)
      expect(res.json).toBeCalledWith(true)
    })
    test('should call create token with the correct params, () => {
         const res = mockResponse()
         const mockRequest
         authService.createUser = vi.fn().mockResolvedValue({id : 1})
         await register(req, res)
         expect(createAccessToken).toBeCalledWith('1h' , { userId : 1})
    })
    test('should send verify email with th correct params', () => {
         const res = mockResponse()
         const req = mockRequest
         authService.createUser = vi.fn().mockResolvedValue({id : 1})
         emailService.sendVerify = vi.fn().mockResolvedValue()
        await register(req, res)
        expect(emailService.sendverify).toBeCalledWith(req.email , 'validate your email', expect.toBe(string))
    })
  })
  describe('signin', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })
    const mockRequest = {
      body: {
        email: 'john.doe@example.com',
        password: '123456'
      }
    } as Request

    test('should return 200 when user is logged in', async () => {
      const res = mockResponse()
      const req = mockRequest
      authService.login = vi.fn().mockResolvedValue(true)
      await signin(req, res)
      expect(res.status).toBeCalledWith(200)
    })
    test('should call login service with correct params', async () => {
      const res = mockResponse()
      const req = mockRequest
      authService.login = vi.fn().mockResolvedValue(true)
      await signin(req, res)
      expect(authService.login).toBeCalledWith(mockRequest.body)
    })
    test('should return accesToken if user is logged in', async () => {
      const res = mockResponse()
      const req = mockRequest
      authService.login = vi.fn().mockResolvedValue({ accessToken: 'validAccessToken', refreshToken: 'validRefreshToken' })      
      await signin(req, res)
      expect(res.json).toBeCalledWith(expect.objectContaining({ accessToken: expect.any(String) }))
    })
    test('should set refreshToken cookie if user is logged in', async () => {
      const res = mockResponse()
      const req = mockRequest
      authService.login = vi.fn().mockResolvedValue({ accessToken: 'validAccessToken', refreshToken: 'validRefreshToken' })
      await signin(req, res)
      expect(res.cookie).toBeCalledWith('refreshToken', 'validRefreshToken', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    })
  })
  describe('refresh', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })
    test.skip('should return 200 when token is refreshed', async () => {
      const res = mockResponse()
      const req = { body: { decoded: { userId: 'validUserId' } } } as Request
    })
    test.skip('should return accesToken if token is refreshed', async () => {
    })
    test.skip('should call createAccesToken with correct params', async () => { })
  })
})
