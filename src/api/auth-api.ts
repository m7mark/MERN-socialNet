import {
  CommonDataResponseType,
  instance,
  ResultCodeEnum,
  ResultCodeForCaptchaEnum,
} from './api';


// let config = {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   }
// }

type MeResponseDataType = {
  id: string
  email: string
  login: string
}
type LoginResponseDataType = {
  userId: string | undefined
  token: string | null
}
export const authAPI = {
  me(): Promise<CommonDataResponseType<MeResponseDataType>> {
    return instance.get(`auth/me`);
  },
  login(email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null): Promise<CommonDataResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>> {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha })
  },
  logout(): Promise<CommonDataResponseType> {
    return instance.delete(`auth/login`)
  }
}