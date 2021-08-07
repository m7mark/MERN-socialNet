import {
    CommonResponseType,
    instance,
    ResultCodeEnum,
    ResultCodeForCaptchaEnum
} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}
export const authAPI = {
    async me() {
        const response = await instance.get
            <CommonResponseType<MeResponseDataType>>
            (`auth/me`);
        return response.data;
    },
    login(email: string,
        password: string,
        rememberMe = false,
        captcha: string | null = null) {
        return instance.post
            <CommonResponseType<LoginResponseDataType,
                ResultCodeEnum | ResultCodeForCaptchaEnum>>
            (`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete
            <CommonResponseType>(`auth/login`)
    }
}