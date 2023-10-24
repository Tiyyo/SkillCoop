import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthorizationError from './errors/unauthorized.error';
import { ObjectRecordGeneric } from '../@types/types';
const { sign, verify } = jwt;

export default {
  createToken: function (
    expireTime: string,
    key: string,
    payload: ObjectRecordGeneric,
  ) {
    const token = sign({ data: payload }, key, {
      expiresIn: expireTime,
    });
    return token;
  },
  createPairAuthToken: function (payload: ObjectRecordGeneric) {
    const accessToken = this.createToken(
      '15m',
      process.env.JWT_TOKEN_KEY as string,
      payload,
    );
    const refreshToken = this.createToken(
      '7d',
      process.env.JWT_REFRESH_TOKEN_KEY as string,
      payload,
    );
    return { accessToken, refreshToken };
  },
  verifyTokenAndGetData: function (token: string, key: string) {
    let payload: ObjectRecordGeneric | null = null;
    verify(token, key, (err, decoded) => {
      if (err && err.message === 'jwt expired') {
        throw new AuthorizationError('No access');
      }
      if (err) {
        throw new Error('Invalid token');
      }
      if (decoded && typeof decoded !== 'string') {
        payload = decoded.data;
      }
    });
    return payload;
  },
  validate: function (tokenType: 'email' | 'refresh' | 'access') {
    const getToken = this.getToken;
    const validateToken = this.validateToken;
    let errMessage = 'Unauthorized';
    if (tokenType === 'access') {
      errMessage = 'No access';
    }
    return async function (req: Request, res: Response, next: NextFunction) {
      const token = getToken(req, tokenType);
      if (!token) return next(new AuthorizationError(errMessage));
      try {
        const payload = validateToken(token, tokenType);
        if (!payload) throw new Error('No payload');
        req.body.decoded = payload;
        next();
      } catch (error) {
        next(error);
      }
    };
  },
  validateToken: (token: string, tokenType: 'email' | 'refresh' | 'access') => {
    let payload;
    switch (tokenType) {
      case 'email':
        return (payload = (this as any).default.verifyTokenAndGetData( // eslint-disable-line
          token,
          process.env.JWT_EMAIL_TOKEN_KEY as string,
        ));
      case 'refresh':
        return (payload = (this as any).default.verifyTokenAndGetData( // eslint-disable-line
          token,
          process.env.JWT_REFRESH_TOKEN_KEY as string,
        ));
      case 'access':
        const payloadAccess = (this as any).default.verifyTokenAndGetData( // eslint-disable-line
          token,
          process.env.JWT_TOKEN_KEY as string,
        );
        return payloadAccess;
      default:
        return payload;
    }
  },
  getToken: (
    request: Request,
    type: 'email' | 'refresh' | 'access',
  ): string | null => {
    let token;
    switch (type) {
      case 'email':
        return (token = (this as any).default.getEmailToken(request)); // eslint-disable-line
      case 'refresh':
        return (token = (this as any).default.getRefreshToken(request)); // eslint-disable-line
      case 'access':
        return (token = (this as any).default.getAccessToken(request)); // eslint-disable-line
      default:
        return null;
    }
  },
  getEmailToken: function (request: Request): string | null {
    const token = request.params.emailToken;
    return token ? token : null;
  },
  getRefreshToken: function (request: Request): string {
    const token = request.cookies.refreshToken;
    return token;
  },
  getAccessToken: function (request: Request): string | null {
    const authHeaders =
      request.headers.Authorization || request.headers.authorization;
    if (
      authHeaders &&
      typeof authHeaders === 'string' &&
      authHeaders.startsWith('Bearer')
    ) {
      const token = authHeaders.split(' ')[1];
      return token;
    } else {
      return null;
    }
  },
};
