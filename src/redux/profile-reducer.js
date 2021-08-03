import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTOS_SUCCESS = 'SET_PHOTOS_SUCCESS';
const PROFILE_IS_FETCHING = 'PROFILE_IS_FETCHING';

let initialState = {
    postData: [
        { id: 1, message: "How are you", likesCount: 12 },
        { id: 2, message: "Good and you", likesCount: 2 },
    ],
    profile: null,
    status: '',
    isFetching: false
}
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PHOTOS_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }
        case PROFILE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        default:
            return state;
    }
}

export const addNewPostBody = (newPostText) => ({ type: ADD_POST, newPostText })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSuccess = (photos) => ({ type: SET_PHOTOS_SUCCESS, photos })
export const profileIsFetching = (isFetching) => ({ type: PROFILE_IS_FETCHING, isFetching });

export const getUserProfile = (id) => async (dispatch) => {
    dispatch(profileIsFetching(true));
    const data = await profileAPI.getUserProfile(id)
    dispatch(profileIsFetching(false));
    dispatch(setUserProfile(data));

}

export const getStatus = (id) => async (dispatch) => {
    const response = await profileAPI.getStatus(id)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
    else if (response.data.resultCode === 1) {
        let errorStatusMessage = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error";
        return Promise.reject(errorStatusMessage);
    }
}
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfileInfo = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfileInfo(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
    else {
        let errorLoginMessage = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error";
        return Promise.reject(errorLoginMessage);
    }
}

export default profileReducer;
