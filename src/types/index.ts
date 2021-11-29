import { JwtPayload } from "jsonwebtoken"
import { Request } from 'express'

export interface IRequest extends Request {
  user?: JwtPayload
}