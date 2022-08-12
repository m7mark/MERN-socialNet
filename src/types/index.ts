import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export interface IPayload extends JwtPayload {
  id: string
  roles: Array<string>
}
export interface IRequest<T = any> extends Request<ParamsDictionary, any, T> {
  user?: IPayload
}

export interface IUserReqBody {
  email: string
  login: string
  password: string
}

export interface IUserReqQuery {
  count: string
  page: string
  term: string
  friend: string
}
