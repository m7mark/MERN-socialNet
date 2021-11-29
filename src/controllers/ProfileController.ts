import createError from 'http-errors'
import { validationResult } from 'express-validator'
import { Response, NextFunction } from 'express'
import { IRequest } from '../types/index'
import ProfileServices from '../services/ProfileServices'
import { emitter } from '../services/ProfileServices';
class ProfileController {
  //GET PROFILE
  async getProfile(req: IRequest, res: Response, next: NextFunction) {
    try {
      const profile = await ProfileServices.getProfile(req.params.userId
      )
      res.json(profile);
    } catch (e) {
      return next(createError(500, 'Get profile error'))
    }
  }
  //UPDATE PROFILE
  async updateProfile(req: IRequest, res: Response, next: NextFunction) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const userId = req.user?.id as string
      if (!userId) { return next(createError(500, 'You are not autorizated')) }
      await ProfileServices.updateProfile(userId, req.body)
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      return next(createError(500, 'Update profile error'))
    }
  }
  //GET STATUS
  async getStatus(req: IRequest, res: Response, next: NextFunction) {
    try {
      const status = await ProfileServices.getStatus(req.params.userId)
      res.json(status);
    } catch (e) {
      return next(createError(500, 'Get status error'))
    }
  }
  //UPDATE STATUS
  async updateStatus(req: IRequest, res: Response, next: NextFunction) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const status = req.body.status as string
      const id = req.user?.id as string
      if (!id) { return next(createError(500, 'You are not autorizated')) }
      await ProfileServices.updateStatus(id, status)
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      return next(createError(500, 'Update status error'))
    }
  }
  //FOLLOW USER
  async followUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (req.params.userId === req.user?.id) { return next(createError(500, 'You can not follow yourself')) }
      await ProfileServices.follow(req.params.userId, req.user?.id)
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      return next(createError(500, 'Follow user error'))
    }
  }
  //UNFOLLOW USER
  async unfollowUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (req.params.userId === req.user?.id) { return next(createError(500, 'You can not follow yourself')) }
      await ProfileServices.unfollow(req.params.userId, req.user?.id)
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      return next(createError(500, 'Unfollow user error'))
    }
  }
  //IS CURRENT USER FOLLOWED
  async isFollowed(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (req.params.userId === req.user?.id) { return next(createError(500, 'You can not check follow yourself')) }
      const isFollow = await ProfileServices.isFollowed(req.params.userId, req.user?.id)
      // true or false
      res.json(isFollow)
    } catch (e) {
      return next(createError(500, 'Check user error'))
    }
  }
  //UPLOAD USER PHOTO
  async putUserPhoto(req: IRequest, res: Response, next: NextFunction) {
    try {
      await ProfileServices.uploadPhoto(req.user?.id, req.file?.path
      )
        .then(() => {
          emitter.once('upload', (response) =>
            res.json({ resultCode: 0, messages: [], data: response })
          );
        })
    } catch (e) {
      return next(createError(500, 'Upload photo error'))
    }
  }
}

export default new ProfileController