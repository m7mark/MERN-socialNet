import { CommonResponseType, GetItemsType, instance } from "./api";

export const userAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const res = await instance.get
            <GetItemsType>(`users?page=${currentPage}&count=${pageSize}`);
        return res.data;
    },
    async unfollow(id: number) {
        const res = await instance.delete
            <CommonResponseType>(`follow/${id}`);
        return res.data;
    },
    async follow(id: number) {
        const res = await instance.post
            <CommonResponseType>(`follow/${id}`);
        return res.data;
    }
}