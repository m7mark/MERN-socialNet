import axios from 'axios';
import { UserType } from '../types/types';

const BASE_URL = 'https://snoapi.herokuapp.com/api/'
// const BASE_URL = 'http://localhost:5000/api/'

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {}
  }
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
  else {
    return config
  }
})

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
