import { User } from '../models/User'
import Profile, { IProfile } from '../models/Profile'
import { IUser } from '../models/User'
import sharp from 'sharp'
import fs from 'fs'
import { UploadApiResponse, v2 } from 'cloudinary'
import { bufferToStream } from '../utils/bufferToStream'
import { getCloudinaryOptions } from '../config/cloudinary.config'

class ProfileServices {
  async getProfile(userId: string): Promise<IProfile | null> {
    const user = await User.findById(userId)
    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        $set: {
          photos: {
            small: user?.photos.small,
            large: user?.photos.large,
          },
        },
      },
      { new: true }
    ).select(['-_id', '-__v'])
    return profile
  }

  async updateProfile(profile: IProfile, userId?: string) {
    await Profile.findOneAndUpdate(
      { userId },
      {
        $set: profile,
      }
    )
  }

  async getStatus(userId: string) {
    const response = await User.findById(userId)
    return response?.status
  }

  async updateStatus(status: string, id?: string) {
    await User.findByIdAndUpdate(id, { status: status })
  }

  async follow(userId: string, currentUser?: string) {
    await User.findById(userId)
    await User.findByIdAndUpdate(currentUser, {
      $addToSet: { followedIds: userId },
    })
  }

  async unfollow(userId: string, currentUser?: string) {
    await User.findById(userId)
    await User.findByIdAndUpdate(currentUser, {
      $pull: { followedIds: userId },
    })
  }

  async isFollowed(userId: string, currentUser?: string) {
    await User.findById(userId)
    const response = await User.findById(currentUser)
    return response?.followedIds?.includes(userId)
  }

  async uploadPhoto(
    filePath?: string,
    currentUser?: string
  ): Promise<IUser['photos'] | undefined> {
    const fileName = 'img-' + currentUser + '.jpg'
    const bufferImg = await sharp(filePath).rotate().resize(300, 300).toBuffer()

    return new Promise((resolve) => {
      const streamUpload = v2.uploader.upload_stream(
        getCloudinaryOptions(fileName),
        async (_, result?: UploadApiResponse) => {
          filePath && fs.unlinkSync(filePath)
          const user = await User.findByIdAndUpdate(
            currentUser,
            {
              $set: {
                'photos.small': result?.secure_url,
                'photos.large': result?.secure_url,
              },
            },
            { new: true }
          )
          resolve(user?.photos)
        }
      )
      bufferToStream(bufferImg).pipe(streamUpload)
    })
  }
}

export default new ProfileServices()
