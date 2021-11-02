import Profile from "../models/Profile.js";
import createError from 'http-errors';
import User from "../models/User.js";
import sharp from "sharp";
import path from 'path';


class ProfileController {

  //GET PROFILE
  async getProfile(req, res, next) {
    try {
      const userId = req.params.userId
      const { photos } = await User.findById(userId)
      const profile = await Profile.findOneAndUpdate(
        { userId },
        {
          $set: { photos: { small: photos.small, large: photos.large } }
        },
        { new: true }
      )
      if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json(profile);
    } catch (e) {
      throw createError(500, 'Get profile error')
    }
  }
  //UPDATE PROFILE
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id
      if (!userId) { return next(createError(500, 'You are not autorizated')) }
      const profile = await Profile.findOneAndUpdate({ userId }, {
        $set: req.body
      })
      if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      throw createError(500, 'Update profile error')
    }
  }
  //GET STATUS
  async getStatus(req, res, next) {
    try {
      const userId = req.params.userId
      const { status } = await User.findById(userId)
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json(status);
    } catch (e) {
      throw createError(500, 'Get status error')
    }
  }
  //UPDATE STATUS
  async updateStatus(req, res, next) {
    try {
      const id = req.user.id
      if (!id) { return next(createError(500, 'You are not autorizated')) }
      await User.findByIdAndUpdate(id, { status: req.body.status })
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      // console.log(e);
      throw createError(500, 'Update status error')
    }
  }
  //FOLLOW USER
  async followUser(req, res, next) {
    try {
      const userId = req.params.userId
      const currentUser = req.user.id
      // if (!currentUser) { return next(createError(500, 'You are not autorizated')) }
      if (currentUser === userId) { return next(createError(500, 'You can not follow yourself')) }
      await User.findById(userId)
      await User.findByIdAndUpdate(currentUser, { $addToSet: { followedIds: userId } })
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      // console.log(e);
      throw createError(500, 'Follow user error')
    }
  }
  //UNFOLLOW USER
  async unfollowUser(req, res, next) {
    try {
      const userId = req.params.userId
      const currentUser = req.user.id
      // if (!currentUser) { return next(createError(500, 'You are not autorizated')) }
      if (currentUser === userId) { return next(createError(500, 'You can not unfollow yourself')) }
      await User.findById(userId)
      await User.findByIdAndUpdate(currentUser, { $pull: { followedIds: userId } })
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json({ resultCode: 0, messages: [], data: {} })
    } catch (e) {
      // console.log(e);
      throw createError(500, 'Unfollow user error')
    }
  }
  //IS CURRENT USER FOLLOWED
  async isFollowed(req, res, next) {
    try {
      const userId = req.params.userId
      const currentUser = req.user.id
      // if (!currentUser) { return next(createError(500, 'You are not autorizated')) }
      if (currentUser === userId) { return next(createError(500, 'You can not follow yourself')) }
      await User.findById(userId)
      const { followedIds } = await User.findById(currentUser)
      if (followedIds.includes(userId)) { return res.json(true) }
      res.json(false)
    } catch (e) {
      // console.log(e);
      throw createError(500, 'Check user error')
    }
  }
  //IS CURRENT USER FOLLOWED
  async putUserPhoto(req, res, next) {
    try {
      const currentUser = req.user.id
      const fileName = 'img-' + currentUser + '.jpg'
      const filePath = path.resolve('uploads', fileName)
      sharp(req.file.buffer)
        .rotate()
        .resize(300, 300)
        .toFile(filePath, function (err, sharp) {
          if (err) {
            return next(createError(500, 'File format error'))
          }
          res.json({ resultCode: 0, messages: [], data: {} })
        })
    } catch (e) {
      // console.log(e);
      throw createError(500, 'Upload photo error')
    }
  }

}

export default new ProfileController()
