import createError from 'http-errors'
import { validationResult } from 'express-validator'
import { Response, NextFunction } from 'express'
import { IRequest } from '../types/index'
import UserServices from '../services/UserServices'
interface bodyI {
  email: string
  login: string
  password: string
}
class UsersController {
  //REGISTER
  async register(req: IRequest, res: Response, next: NextFunction) {
    try {
      //validating errors
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const { email, login, password }: bodyI = req.body
      await UserServices.register(email, login, password)
      res.json({ resultCode: 0, messages: [], data: { username: login, email: email } })
    }
    catch (e: any) {
      // console.log(e);
      return next(createError(500, `Registration error ${e?.message}`))
    }
  }
  //LOGIN
  async login(req: IRequest, res: Response, next: NextFunction) {
    try {
      //validating errors
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const { email, password }: bodyI = req.body
      const data = await UserServices.login(email, password)
      res.json({ resultCode: 0, messages: [], data: data })
    } catch {
      return next(createError(500, 'Wrong credentials'))
    }
  }
  //LOGOUT
  async logout(req: IRequest, res: Response, next: NextFunction) {
    try {
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch {
      return next(createError(500, 'Something wrong'))
    }
  }
  //GET ALL USERS (ADMIN ACCESS)
  async getUsers(req: IRequest, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.getUsers()
      res.json({ resultCode: 0, messages: [], data: users })
    } catch {
      return next(createError(500, 'You are not autorizated'))
    }
  }
  //GET ONE USER
  async me(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await UserServices.me(req.user?.id)
      res.json({ resultCode: 0, messages: [], data: data })
    } catch {
      return next(createError(500, 'You are not autorizated'))
    }
  }
  //GET LIST OF USERS
  async getListOfUsers(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { users, total } = await UserServices.getListOfUsers(req.user?.id, req.query)
      res.json({ items: users, totalCount: total, error: null, })
    } catch (e) {
      return next(createError(500, 'Get users error'))
    }
  }
}

export default new UsersController