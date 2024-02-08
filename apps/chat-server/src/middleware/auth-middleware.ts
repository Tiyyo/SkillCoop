import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from '@nestjs/jwt'
import { Logger } from "@nestjs/common";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {
  }
  async use(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies.refreshToken
    console.log('token', token)
    Logger.debug('token', token)
    console.log('req.cookies', req.cookies)
    Logger.debug('req.cookies', req.cookies)
    if (!token) {
      console.log('No token found')
      Logger.debug('No token found')
      throw new UnauthorizedException()
    }
    try {
      await this.jwtService.verifyAsync(token, { secret: process.env.JWT_REFRESH_TOKEN_KEY })
    } catch (error) {
      Logger.error(`Error validating token :`, error)
      console.log('Error validating token :', error)
      throw new UnauthorizedException()
    }
    next()
  }
}