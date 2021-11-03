import { PhotosType, ProfileType } from '../types/types';
import {
  CommonDataEmptyResponseType,
  CommonDataResponseType,
  instance,
} from './api';

export const profileAPI = {
  getUserProfile(id: string | undefined): Promise<CommonDataEmptyResponseType<ProfileType>> {
    return instance.get(`profile/${id}`)
  },
  getStatus(id: string): Promise<CommonDataEmptyResponseType<string>> {
    return instance.get(`profile/status/${id}`)
  },
  updateStatus(status: string | undefined): Promise<CommonDataResponseType> {
    return instance.put(`profile/status`, { status })
  },
  saveProfileInfo(profile: ProfileType): Promise<CommonDataResponseType> {
    return instance.put(`profile`, profile)
  },
  savePhoto(photoFile: any): Promise<CommonDataResponseType<PhotosType>> {
    const formData = new FormData()
    formData.append("image", photoFile);
    return instance.put(`/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

}