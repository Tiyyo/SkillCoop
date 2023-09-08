import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import AuthorizationError from "../helpers/errors/unauthorized.error";

const { verify } = jwt

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  let token: string = ""

  let authHeaders = req.headers.Authorization || req.headers.authorization
  if (authHeaders && typeof authHeaders === "string" && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1]

    console.log(token);

    verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
      if (err) throw new AuthorizationError('unauthorized')
      req.body.decoded = decoded
      next()
    })
  }
  if (!token) throw new AuthorizationError('unauthorized')
}

export default validateToken