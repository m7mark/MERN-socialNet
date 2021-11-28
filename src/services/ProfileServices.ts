import { User } from '../models/User'
import Profile from '../models/Profile'
import createError from 'http-errors'
import sharp from 'sharp'
import fs from 'fs'
import { UploadResponseCallback, v2 } from 'cloudinary'
import { Readable } from 'stream'
import { NextFunction } from 'express'
import { EventEmitter } from 'events';

export const emitter = new EventEmitter()
class ProfileServices {

  async uploadPhoto(currentUser: string, filePath: string | undefined, next: NextFunction) {
    const fileName = 'img-' + currentUser + '.jpg'
    const bufferToStream = (buffer: Buffer) => {
      const readable = new Readable({
        read() {
          this.push(buffer)
          this.push(null)
        },
      });
      return readable
    };

    const buffimg = await sharp(filePath)
      .rotate()
      .resize(300, 300)
      .toBuffer();

    const options = {
      folder: 'SNOAPI',
      filename_override: `${fileName}`,
      unique_filename: false,
      use_filename: true
    }

    const handleResponse: UploadResponseCallback = async (error, result) => {
      filePath && fs.unlinkSync(filePath)
      if (error) return next(createError(500, 'Save photo error'));
      // send new photo url throught emmiter
      await User.findByIdAndUpdate(currentUser, { $set: { 'photos.small': result?.secure_url, 'photos.large': result?.secure_url } }, { new: true })
        .then(response => {
          emitter.emit('upload', response?.photos);
        })
      return next()
    }

    const stream = v2.uploader.upload_stream(
      options,
      handleResponse
    );
    bufferToStream(buffimg).pipe(stream);
  }

  async getProfile(userId: string) {
    const response = await User.findById(userId)
    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        $set: { photos: { small: response?.photos.small, large: response?.photos.large } }
      },
      { new: true }
    )
    return profile
  }

  async updateProfile(userId: string, body: any) {
    await Profile.findOneAndUpdate({ userId }, {
      $set: body
    })
  }

  async getStatus(userId: string) {
    const response = await User.findById(userId)
    return response?.status
  }

  async updateStatus(id: string, status: string) {
    await User.findByIdAndUpdate(id, { status: status })
  }

  async follow(userId: string, currentUser: string) {
    await User.findById(userId)
    await User.findByIdAndUpdate(currentUser, { $addToSet: { followedIds: userId } })
  }

  async unfollow(userId: string, currentUser: string) {
    await User.findById(userId)
    await User.findByIdAndUpdate(currentUser, { $pull: { followedIds: userId } })
  }

  async isFollowed(userId: string, currentUser: string) {
    await User.findById(userId)
    const response = await User.findById(currentUser)
    return response?.followedIds?.includes(userId)
  }
}

export default new ProfileServices