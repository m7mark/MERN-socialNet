import axios from "axios"
import { UserType } from "../types/types";

export const apiKey = 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
});
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type CommonResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}
