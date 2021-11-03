import {
  CommonDataEmptyResponseType,
  CommonDataResponseType,
  GetItemsType,
  instance,
} from './api';

export const userAPI = {
  getUsers(
    currentPage = 1,
    pageSize = 10,
    term: string = '',
    friend: null | boolean = null): Promise<CommonDataEmptyResponseType<GetItemsType>> {
    return instance.get
      <GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
  },
  unfollow(id: string): Promise<CommonDataResponseType> {
    return instance.delete(`follow/${id}`);
  },
  follow(id: string): Promise<CommonDataResponseType> {
    return instance.post(`follow/${id}`);
  }
}