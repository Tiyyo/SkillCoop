import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthorizationError from './errors/unauthorized.error';
import { ObjectRecordGeneric } from '../@types/types';
import logger from './logger';
const { sign, verify } = jwt;

const tokenHandler = {
  createToken: function (expireTime: string, key: string, payload: ObjectRecordGeneric) {
    const token = sign({ data: payload }, key, {
      expiresIn: expireTime,
    });
    return token;
  },
  createPairAuthToken: function (payload: ObjectRecordGeneric) {
    const accessToken = this.createToken('15m', process.env.JWT_TOKEN_KEY as string, payload);
    const refreshToken = this.createToken(
      '7d',
      process.env.JWT_REFRESH_TOKEN_KEY as string,
      payload,
    );
    return { accessToken, refreshToken };
  },
  verifyTokenAndGetData: function (token: string, key: string): ObjectRecordGeneric | null {
    let payload: ObjectRecordGeneric | null = null;
    verify(token, key, (err, decoded) => {
      if (err && err.message === 'jwt expired') {
        logger.error('Token expired');
        throw new AuthorizationError('No access');
      }
      if (err) {
        throw new Error('Invalid token');
      }
      if (decoded && typeof decoded !== 'string') {
        payload = decoded.data;
        return payload;
      }
    });
    return payload;
  },
  validate: function (tokenType: 'email' | 'refresh' | 'access') {
    let errMessage = 'Unauthorized';
    if (tokenType === 'access') {
      errMessage = 'No access';
    }
    return async function (req: Request, _res: Response, next: NextFunction) {
      const token = tokenHandler.getToken(req, tokenType);
      if (!token) return next(new AuthorizationError(errMessage));
      try {
        const payload = tokenHandler.validateToken(token, tokenType);
        if (!payload) throw new Error('No payload');
        req.body.decoded = payload;
        next();
      } catch (error) {
        next(error);
      }
    };
  },
  validateInfosTokens: function () {
    return async function (req: Request, _res: Response, next: NextFunction) {
      const accessToken = tokenHandler.getAccessToken(req);
      const refreshToken = tokenHandler.getRefreshToken(req);

      if (!accessToken || !refreshToken) {
        return next(new AuthorizationError('Unauthorized'));
      }
      try {
        const payloadAccess = tokenHandler.verifyTokenAndGetData(
          accessToken,
          process.env.JWT_TOKEN_KEY as string,
        );
        const payloadRefresh = tokenHandler.verifyTokenAndGetData(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_KEY as string,
        );
        if (!payloadAccess || !payloadRefresh) {
          return next(new AuthorizationError('Unauthorized'));
        }
        if (payloadAccess.user_id !== payloadRefresh.user_id) {
          return next(new AuthorizationError('Unauthorized'));
        }
        next();
      } catch (error) {
        return next(error);
      }
    };
  },
  validateToken: (token: string, tokenType: 'email' | 'refresh' | 'access') => {
    let payload;
    switch (tokenType) {
      case 'email':
        return (payload = tokenHandler.verifyTokenAndGetData(
          token,
          process.env.JWT_EMAIL_TOKEN_KEY as string,
        ));
      case 'refresh':
        return (payload = tokenHandler.verifyTokenAndGetData(
          token,
          process.env.JWT_REFRESH_TOKEN_KEY as string,
        ));
      case 'access':
        return tokenHandler.verifyTokenAndGetData(token, process.env.JWT_TOKEN_KEY as string);
      default:
        return payload;
    }
  },
  getToken: (request: Request, type: 'email' | 'refresh' | 'access'): string | null => {
    switch (type) {
      case 'email':
        return tokenHandler.getEmailToken(request);
      case 'refresh':
        return tokenHandler.getRefreshToken(request);
      case 'access':
        return tokenHandler.getAccessToken(request);
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
    const authHeaders = request.headers.Authorization || request.headers.authorization;
    if (authHeaders && typeof authHeaders === 'string' && authHeaders.startsWith('Bearer')) {
      const token = authHeaders.split(' ')[1];
      return token;
    } else {
      return null;
    }
  },
};

export default tokenHandler;
