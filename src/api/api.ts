import axios from 'axios';
import { UserType } from '../types/types';

const BASE_URL = 'https://snoapi.herokuapp.com/api/'
// const BASE_URL = 'http://localhost:5000/api/'
// export const apiKey = 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
// baseURL: 'https://social-network.samuraijs.com/api/1.0/',
export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
export type CommonDataResponseType<D = {}, RC = ResultCodeEnum> = {
  data: {
    data: D
    messages: Array<string>
    resultCode: RC
  }
}
export type CommonDataEmptyResponseType<D> = {
  data: D
}
export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}
