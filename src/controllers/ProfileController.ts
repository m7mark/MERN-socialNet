import { User } from '../models/User'
import Profile from '../models/Profile'
import createError from 'http-errors'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { validationResult } from 'express-validator'
import { Response } from 'express'
import { IRequest } from '../types/index'
import cloudinary from 'cloudinary'
import { Readable } from 'stream'
class ProfileController {
  //GET PROFILE
  async getProfile(req: IRequest, res: Response, next: any) {
    try {
      const userId = req.params.userId
      const response = await User.findById(userId)
      const profile = await Profile.findOneAndUpdate(
        { userId },
        {
          $set: { photos: { small: response?.photos.small, large: response?.photos.large } }
        },
        { new: true }
      )
      if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json(profile);
    } catch (e) {
      return next(createError(500, 'Get profile error'))
    }
  }
  //UPDATE PROFILE
  async updateProfile(req: IRequest, res: Response, next: any) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const userId = req.user?.id
      if (!userId) { return next(createError(500, 'You are not autorizated')) }
      const profile = await Profile.findOneAndUpdate({ userId }, {
        $set: req.body
      })
      if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      return next(createError(500, 'Update profile error'))
    }
  }
  //GET STATUS
  async getStatus(req: IRequest, res: Response, next: any) {
    try {
      const userId = req.params.userId
      const response = await User.findById(userId)
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json(response?.status);
    } catch (e) {
      return next(createError(500, 'Get status error'))
    }
  }
  //UPDATE STATUS
  async updateStatus(req: IRequest, res: Response, next: any) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.array()[0].msg}`)) }
      const id = req.user?.id
      if (!id) { return next(createError(500, 'You are not autorizated')) }
      await User.findByIdAndUpdate(id, { status: req.body.status })
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      // console.log(e);
      return next(createError(500, 'Update status error'))
    }
  }
  //FOLLOW USER
  async followUser(req: IRequest, res: Response, next: any) {
    try {
      const userId = req.params.userId
      const currentUser = req.user?.id
      // if (!currentUser) { return next(createError(500, 'You are not autorizated')) }
      if (currentUser === userId) { return next(createError(500, 'You can not follow yourself')) }
      await User.findById(userId)
      await User.findByIdAndUpdate(currentUser, { $addToSet: { followedIds: userId } })
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      // console.log(e);
      return next(createError(500, 'Follow user error'))
    }
  }
  //UNFOLLOW USER
  async unfollowUser(req: IRequest, res: Response, next: any) {
    try {
      const userId = req.params.userId
      const currentUser = req.user?.id
      // if (!currentUser) { return next(createError(500, 'You are not autorizated')) }
      if (currentUser === userId) { return next(createError(500, 'You can not unfollow yourself')) }
      await User.findById(userId)
      await User.findByIdAndUpdate(currentUser, { $pull: { followedIds: userId } })
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      // console.log(e);
      return next(createError(500, 'Unfollow user error'))
    }
  }
  //IS CURRENT USER FOLLOWED
  async isFollowed(req: IRequest, res: Response, next: any) {
    try {
      const userId = req.params.userId
      const currentUser = req.user?.id
      // if (!currentUser) { return next(createError(500, 'You are not autorizated')) }
      if (currentUser === userId) { return next(createError(500, 'You can not follow yourself')) }
      await User.findById(userId)
      const response = await User.findById(currentUser)
      if (response?.followedIds?.includes(userId)) { return res.json(true) }
      res.json(false)
    } catch (e) {
      // console.log(e);
      return next(createError(500, 'Check user error'))
    }
  }
  //UPLOAD USER PHOTO
  async putUserPhoto(req: IRequest, res: Response, next: any) {
    try {
      const currentUser = req.user?.id
      const fileName = 'img-' + currentUser + '.jpg'
      const filePath = path.resolve('uploads', fileName)
      const fileLink = process.env.REACT_APP_SERVER_API + fileName

      const bufferToStream = (buffer: Buffer) => {
        const readable = new Readable({
          read() {
            this.push(buffer)
            this.push(null)
          },
        });
        return readable
      };

      const buffimg = await sharp(req.file?.path)
        .rotate()
        .resize(300, 300)
        .toBuffer();
        
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: 'SNOAPI' },
        (error, result) => {
          req.file && fs.unlinkSync(req.file.path)
          if (error) return console.log(error);
          res.json({ resultCode: 0, messages: [], data: {} });
        }
      );
      bufferToStream(buffimg).pipe(stream);

      // sharp(req.file?.path)
      //   .rotate()
      //   .resize(300, 300)
      //   .toFile(filePath, function (err, sharp) {
      //     if (err) {
      //       req.file && fs.unlinkSync(req.file.path)
      //       return next(createError(500, 'File format error'));
      //     }
      //     req.file && fs.unlinkSync(req.file.path)
      //     const data = {
      //       small: fileLink,
      //       large: fileLink
      //     }
      //     res.json({ resultCode: 0, messages: [], data: data });
      //   })
      await User.findByIdAndUpdate(currentUser, { $set: { 'photos.small': fileLink, 'photos.large': fileLink } })
    } catch (e) {
      return next(createError(500, 'Upload photo error'))
    }
  }
}

export default new ProfileController