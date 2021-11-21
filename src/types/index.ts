import { JwtPayload } from "jsonwebtoken"
import { Request } from 'express'
// declare module Express {
//   interface Request {
//     user?: string | JwtPayload
//   }
// }
export interface IRequest extends Request {
  user?: JwtPayload
}