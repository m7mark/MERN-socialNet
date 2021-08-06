import axios from "axios"
import { PhotosType, ProfileType, UserType } from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
    }
});

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
type CommonResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: object
}
export const userAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get
            <GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    async unfollow(id: number) {
        const response = await instance.delete
            <CommonResponseType>(`follow/${id}`);
        return response.data;
    },
    async follow(id: number) {
        const response = await instance.post
            <CommonResponseType>(`follow/${id}`);
        return response.data;
    }
}
type SavePhotoResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: { photos: PhotosType }
}

export const profileAPI = {
    async getUserProfile(id: number | null) {
        const response = await instance.get
            <ProfileType>(`profile/${id}`);
        return response.data;
    },
    getStatus(id: number) {
        return instance.get
            <string>(`profile/status/${id}`)
    },
    updateStatus(status: string) {
        return instance.put
            <CommonResponseType>(`profile/status`, { status })
    },
    saveProfileInfo(profile: ProfileType) {
        return instance.put
            <CommonResponseType>(`profile`, profile)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile);
        return instance.put
            <SavePhotoResponseType>(`/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    }
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: string
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}
export const authAPI = {
    async me() {
        const response = await instance.get
            <MeResponseType>(`auth/me`);
        return response.data;
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post
            <LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete
            <LogoutResponseType>(`auth/login`)
    }
}
type GetCaptchaUrlResponseType = {
    url: string
}
export const securityAPI = {
    async getCaptchaUrl() {
        const response = await instance.get
            <GetCaptchaUrlResponseType>(`security/get-captcha-url`);
        return response;
    }
}
