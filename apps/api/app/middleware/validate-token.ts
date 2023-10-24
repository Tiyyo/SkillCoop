// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken"
// import AuthorizationError from "../helpers/errors/unauthorized.error";

// const { verify } = jwt

// const validateToken = (req: Request, _res: Response, next: NextFunction) => {
//   let token: string = ""

//   req.cookies && req.cookies.refreshToken ?
// token = req.cookies.refreshToken : token = ""

//   verify(token, process.env.JWT_REFRESH_TOKEN_KEY as string,
// (err, decoded) => {
//     if (err) throw new AuthorizationError('unauthorized refresh token')
//     req.body.decoded = decoded
//     next()
//   })
// }

// export default validateToken