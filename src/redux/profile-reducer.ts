import { ThunkAction } from "redux-thunk";
import { profileAPI, ResultCodeEnum } from "../api/api";
import { PhotosType, PostData, ProfileType } from "../types/types";
import { AppStateType } from "./store";

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
    ] as Array<PostData>,
    profile: null as ProfileType | null,
    status: '',
    isFetching: false,
    newPostText: ''
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any):
    InitialStateType => {
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
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        case PROFILE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        default:
            return state;
    }
}

type ActionsTypes = AddNewPostBodyActionType | DeletePostActionType |
    SetUserProfileActionType | SetStatusActionType | SavePhotoSuccessActionType |
    ProfileIsFetchingActionType

type AddNewPostBodyActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addNewPostBody = (newPostText: string):
    AddNewPostBodyActionType => ({ type: ADD_POST, newPostText })

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number):
    DeletePostActionType => ({ type: DELETE_POST, postId })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):
    SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string | null
}
export const setStatus = (status: string | null):
    SetStatusActionType => ({ type: SET_STATUS, status })

type SavePhotoSuccessActionType = {
    type: typeof SET_PHOTOS_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):
    SavePhotoSuccessActionType => ({ type: SET_PHOTOS_SUCCESS, photos })

type ProfileIsFetchingActionType = {
    type: typeof PROFILE_IS_FETCHING
    isFetching: boolean
}
export const profileIsFetching = (isFetching: boolean):
    ProfileIsFetchingActionType => ({ type: PROFILE_IS_FETCHING, isFetching });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const getUserProfile = (id: number | null) => async (dispatch: any) => {
    dispatch(profileIsFetching(true));
    const data = await profileAPI.getUserProfile(id)
    dispatch(profileIsFetching(false));
    dispatch(setUserProfile(data));

}

export const getStatus = (id: number): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.getStatus(id)
        dispatch(setStatus(response.data));
    }

export const updateStatus = (status: string): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(setStatus(status));
        }
        else if (response.data.resultCode === ResultCodeEnum.Error) {
            let errorStatusMessage = response.data.messages.length > 0
                ? response.data.messages[0]
                : "Some error";
            return Promise.reject(errorStatusMessage);
        }
    }
export const savePhoto = (file: any): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
export const saveProfileInfo = (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.id;
        const response = await profileAPI.saveProfileInfo(profile)
        if (response.data.resultCode === ResultCodeEnum.Success) {
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
