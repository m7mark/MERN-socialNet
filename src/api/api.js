import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
    }
});

export const userAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    async unfollow(id) {
        const response = await instance.delete(`follow/${id}`);
        return response.data;
    },
    async follow(id) {
        const response = await instance.post(`follow/${id}`);
        return response.data;
    }
}

export const profileAPI = {
    async getUserProfile(id) {
        const response = await instance.get(`profile/${id}`);
        return response.data;
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status })
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image", photoFile);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const authAPI = {
    async me() {
        const response = await instance.get(`auth/me`);
        return response.data;
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
