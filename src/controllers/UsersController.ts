import createError from 'http-errors'
import { validationResult } from 'express-validator'
import { Response, NextFunction, Request } from 'express'
import { IRequest, IUserReqBody } from '../types/index'
import UserServices from '../services/UserServices'
import { getSuccessResponse } from '../utils/getSuccessResponse'

class UsersController {
  //REGISTER
  async register(
    req: IRequest<IUserReqBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      //validating errors
      const err = validationResult(req)
      if (!err.isEmpty()) {
        return next(createError(500, `${err.array()[0].msg}`))
      }
      const { email, login, password } = req.body
      const registerData = await UserServices.register(email, login, password)
      res.json(getSuccessResponse(registerData))
    } catch (e: any) {
      return next(createError(500, `Registration error${e?.message}`))
    }
  }
  //LOGIN
  async login(req: IRequest, res: Response, next: NextFunction) {
    try {
      //validating errors
      const err = validationResult(req)
      if (!err.isEmpty()) {
        return next(createError(500, `${err.array()[0].msg}`))
      }
      const { email, password } = req.body
      const loginData = await UserServices.login(email, password)
      res.json(getSuccessResponse(loginData))
    } catch {
      return next(createError(500, 'Wrong credentials'))
    }
  }
  //LOGOUT
  async logout(_: Request, res: Response, next: NextFunction) {
    try {
      res.json(getSuccessResponse())
    } catch {
      return next(createError(500, 'Something wrong'))
    }
  }
  //GET ALL USERS (ADMIN ACCESS)
  async getUsers(_: IRequest, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.getUsers()
      res.json({ resultCode: 0, messages: [], data: users })
    } catch {
      return next(createError(500, 'You are not authorizated'))
    }
  }
  //GET ONE USER
  async me(req: IRequest, res: Response, next: NextFunction) {
    try {
      const meData = await UserServices.me(req.user?.id)
      res.json(getSuccessResponse(meData))
    } catch {
      return next(createError(500, 'You are not authorizated'))
    }
  }
  //GET LIST OF USERS
  async getListOfUsers(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { users, total } = await UserServices.getListOfUsers(
        req.query as any,
        req.user?.id
      )
      res.json({ items: users, totalCount: total, error: null })
    } catch {
      return next(createError(500, 'Get users error'))
    }
  }
  //DELETE USER AND PROFILE
  async deleteUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      await UserServices.deleteUser(req.params.userId)
      res.json(getSuccessResponse())
    } catch (e: any) {
      return next(createError(500, `Delete user error${e.message}`))
    }
  }
}

export default new UsersController()
