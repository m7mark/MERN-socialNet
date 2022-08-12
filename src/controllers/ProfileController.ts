import createError from 'http-errors'
import { validationResult } from 'express-validator'
import { Response, NextFunction, Request } from 'express'
import { IRequest } from '../types/index'
import ProfileServices from '../services/ProfileServices'
import { getSuccessResponse } from '../utils/getSuccessResponse'
import { IProfile } from '../models/Profile'
class ProfileController {
  //GET PROFILE
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await ProfileServices.getProfile(req.params.userId)
      res.json(profile)
    } catch {
      return next(createError(500, 'Get profile error'))
    }
  }
  //UPDATE PROFILE
  async updateProfile(
    req: IRequest<IProfile>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) {
        return next(createError(500, `${err.array()[0].msg}`))
      }
      await ProfileServices.updateProfile(req.body, req.user?.id)
      res.json(getSuccessResponse())
    } catch (e) {
      return next(createError(500, 'Update profile error'))
    }
  }
  //GET STATUS
  async getStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const status = await ProfileServices.getStatus(req.params.userId)
      res.json(status)
    } catch {
      return next(createError(500, 'Get status error'))
    }
  }
  //UPDATE STATUS
  async updateStatus(
    req: IRequest<{ status: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) {
        return next(createError(500, `${err.array()[0].msg}`))
      }
      await ProfileServices.updateStatus(req.body.status, req.user?.id)
      res.json(getSuccessResponse())
    } catch {
      return next(createError(500, 'Update status error'))
    }
  }
  //FOLLOW USER
  async followUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (req.params.userId === req.user?.id) {
        return next(createError(500, 'You can not follow yourself'))
      }
      await ProfileServices.follow(req.params.userId, req.user?.id)
      res.json(getSuccessResponse())
    } catch (e) {
      return next(createError(500, 'Follow user error'))
    }
  }
  //UNFOLLOW USER
  async unfollowUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (req.params.userId === req.user?.id) {
        return next(createError(500, 'You can not follow yourself'))
      }
      await ProfileServices.unfollow(req.params.userId, req.user?.id)
      res.json(getSuccessResponse())
    } catch {
      return next(createError(500, 'Unfollow user error'))
    }
  }
  //IS CURRENT USER FOLLOWED
  async isFollowed(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (req.params.userId === req.user?.id) {
        return next(createError(500, 'You can not check follow yourself'))
      }
      const isFollow = await ProfileServices.isFollowed(
        req.params.userId,
        req.user?.id
      )
      // true or false
      res.json(isFollow)
    } catch {
      return next(createError(500, 'Check user error'))
    }
  }
  //UPLOAD USER PHOTO
  async uploadUserPhoto(req: IRequest, res: Response, next: NextFunction) {
    try {
      const photos = await ProfileServices.uploadPhoto(
        req.file?.path,
        req.user?.id
      )
      res.json(getSuccessResponse(photos))
    } catch {
      return next(createError(500, 'Upload photo error'))
    }
  }
}

export default new ProfileController()
