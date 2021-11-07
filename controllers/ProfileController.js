const User = require('../models/User');
const Profile = require('../models/Profile');
const createError = require('http-errors');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')
const { validationResult } = require('express-validator');


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
      return next(createError(500, 'Get profile error'))
    }
  }
  //UPDATE PROFILE
  async updateProfile(req, res, next) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.errors[0].msg}`)) }
      const userId = req.user.id
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
  async getStatus(req, res, next) {
    try {
      const userId = req.params.userId
      const { status } = await User.findById(userId)
      // if (!profile) { return next(createError(500, 'User Id incorrect')) }
      res.json(status);
    } catch (e) {
      return next(createError(500, 'Get status error'))
    }
  }
  //UPDATE STATUS
  async updateStatus(req, res, next) {
    try {
      const err = validationResult(req)
      if (!err.isEmpty()) { return next(createError(500, `${err.errors[0].msg}`)) }
      const id = req.user.id
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
      return next(createError(500, 'Follow user error'))
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
      return next(createError(500, 'Unfollow user error'))
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
      return next(createError(500, 'Check user error'))
    }
  }
  //UPLOAD USER PHOTO
  async putUserPhoto(req, res, next) {
    try {
      const currentUser = req.user.id
      const fileName = 'img-' + currentUser + '.jpg'
      const filePath = path.resolve('uploads', fileName)
      const fileLink = process.env.REACT_APP_SERVER_API + fileName
      sharp(req.file.path)
        .rotate()
        .resize(300, 300)
        .toFile(filePath, function (err, sharp) {
          if (err) {
            fs.unlinkSync(req.file.path)
            return next(createError(500, 'File format error'));
          }
          fs.unlinkSync(req.file.path)
          const data = {
            small: fileLink,
            large: fileLink
          }
          res.json({ resultCode: 0, messages: [], data: data });
        })
      await User.findByIdAndUpdate(currentUser, { $set: { 'photos.small': fileLink, 'photos.large': fileLink } })
    } catch (e) {
      return next(createError(500, 'Upload photo error'))
    }
  }
}

module.exports = ProfileController
