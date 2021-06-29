import { profileAPI, userAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postData: [
        { id: 1, message: "How are you", likesCount: 12 },
        { id: 2, message: "Good and you", likesCount: 2 },
    ],
    newPostText: '',
    profile: null,
    status: ''
}
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.text
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
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, text: text })

export const getUserProfile = (id) => {
    return (dispatch) => {
        userAPI.getUserProfile(id)
            .then(data => { dispatch(setUserProfile(data)); });
    }
}
export const getStatus = (id) => {
    return (dispatch) =>
        profileAPI.getStatus(id)
            .then(response => { dispatch(setStatus(response.data)); });
}
export const updateStatus = (status) => {
    return (dispatch) =>
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            });
}

export default profileReducer;
