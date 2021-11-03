import {
  CommonDataEmptyResponseType,
  instance,
} from './api';

type GetCaptchaUrlResponseType = {
  url: string
}
export const securityAPI = {
  getCaptchaUrl(): Promise<CommonDataEmptyResponseType<GetCaptchaUrlResponseType>> {
    return instance.get(`security/get-captcha-url`);
  }
}
