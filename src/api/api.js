import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
    }
});

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    unFollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    },

    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    },
    getUserProfile(id) {
        return instance.get(`profile/${id}`)
            .then(response => response.data);
    },
    authUserData() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    }

}