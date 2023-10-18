// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken"
// import AuthorizationError from "../helpers/errors/unauthorized.error";

// const { verify } = jwt

// const validateToken = (req: Request, res: Response, next: NextFunction) => {

//   let token: string = req.params.emailToken

//   verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {

//     if (err) return res.status(200).json({ error: 'Invalid data' })
//     req.body.decoded = decoded
//     next()
//   })

//   if (!token) return res.status(401).json({ error: 'Invalid data' })
// }

// export default validateToken