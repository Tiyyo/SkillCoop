import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {
  }
  async use(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies.refreshToken
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      await this.jwtService.verifyAsync(token, { secret: process.env.JWT_REFRESH_TOKEN_KEY })
    } catch (error) {
      throw new UnauthorizedException()
    }
    next()
  }
}