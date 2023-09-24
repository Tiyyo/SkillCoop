import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import checkParams from '../utils/checkParams.js';

const { verify } = jwt;

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string = '';
  let userInfos: any = null;
  let requestUserId: string | number = '';
  let authHeaders = req.headers.Authorization || req.headers.authorization
  
  if (authHeaders && typeof authHeaders === "string" && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1]
  }

  //TODO need to control the correct userId or profileId 
  try {
    verify(token, process.env.JWT_TOKEN_KEY as string, async (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') return res.status(401).json({ error: 'Unauthorized user' });
      if (decoded) userInfos = decoded;

      const tokenUserId = userInfos[0].userId;
      if (req.method === 'GET' || req.method === 'DELETE') {
        requestUserId = checkParams(req.params.id);
      }

      if (req.method === 'PUT' || req.method === 'PATCH') {
        requestUserId = req.body.userId;
      }

      if (tokenUserId !== requestUserId) return res.status(401).json({ error: 'Unauthorized user' });
      return next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized user' });
  }
};

export default validateUser;
