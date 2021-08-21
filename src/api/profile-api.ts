import { ProfileType } from "../types/types";
import { CommonResponseType, instance } from "./api";


export const profileAPI = {
    async getUserProfile(id: number | undefined) {
        const response = await instance.get
            <ProfileType>(`profile/${id}`);
        return response.data;
    },
    getStatus(id: number) {
        return instance.get
            <string>(`profile/status/${id}`)
    },
    updateStatus(status: string | undefined) {
        return instance.put
            <CommonResponseType>(`profile/status`, { status })
    },
    saveProfileInfo(profile: ProfileType) {
        return instance.put
            <CommonResponseType>(`profile`, profile)
    },
    //     savePhoto(photoFile: any) {
    //         const formData = new FormData()
    //         formData.append("image", photoFile);
    //         return instance.put
    //             <CommonResponseType<{photos: PhotosType}>>(`/profile/photo`, formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             })
    //     }
}