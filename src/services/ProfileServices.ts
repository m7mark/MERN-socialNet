import { User } from '../models/User'
import Profile from '../models/Profile'
import createError from 'http-errors'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { validationResult } from 'express-validator'
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
    const updateUserPhotos = async (url: string | undefined) => {
      // take new photos url and send it to profile controller
      // throught emmitter
      await User.findByIdAndUpdate(currentUser, { $set: { 'photos.small': url, 'photos.large': url } }, { new: true }).then(response => {
        emitter.emit('upload', response?.photos);
      })
    }

    const handleResponse: UploadResponseCallback = async (error, result) => {
      filePath && fs.unlinkSync(filePath)
      if (error) return next(createError(500, 'Save photo error'));
      updateUserPhotos(result?.secure_url)
      console.log('set photos');
    }

    const stream = v2.uploader.upload_stream(
      options,
      handleResponse
    );

    bufferToStream(buffimg).pipe(stream);
    console.log('lasttttttt');

    return updateUserPhotos
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
}

export default new ProfileServices