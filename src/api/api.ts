import axios from 'axios';
import { UserType } from '../types/types';

const BASE_URL = 'https://snoapi.herokuapp.com/api/'
const token = localStorage.getItem('token')
console.log(token);
export const apiKey = 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
export const instance = axios.create({
  // baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    // 'APIKEY': `Bearer ${token}`
    'APIKEY': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2Y1MmI0YmYyMGUyY2E1ZTYxZjRkNiIsInJvbGVzIjpbIlVTRVIiLCJBRE1JTiJdLCJpYXQiOjE2MzU5NjUzMDcsImV4cCI6MTYzNjIyNDUwN30.jOyIYhZlVkTrztZXDR9Wgr66F9AOvktgT-k_xOoKOs4`
  }
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
