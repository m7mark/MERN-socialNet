import { ResultCodeEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { PhotosType, PostData, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsType } from "./store";

let initialState = {
    postData: [
        { id: 1, message: "How are you", likesCount: 12 },
        { id: 2, message: "Good and you", likesCount: 2 },
    ] as Array<PostData>,
    profile: null as ProfileType | null,
    status: '' as string | undefined,
    isFetching: false,
    newPostText: ''
}
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: ActionsTypes):
    InitialStateType => {
    switch (action.type) {
        case "SN/PROF/ADD_POST":
            let newPost = {
                id: state.postData.length + 1,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }
        case "SN/PROF/DELETE_POST":
            return {
                ...state,
                postData: state.postData.filter(p => p.id !== action.postId)
            }
        case "SN/PROF/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SN/PROF/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SN/PROF/SET_PHOTOS_SUCCESS":
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        case "SN/PROF/PROFILE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    addNewPostBody: (newPostText: string) =>
        ({ type: 'SN/PROF/ADD_POST', newPostText } as const),
    deletePost: (postId: number) =>
        ({ type: 'SN/PROF/DELETE_POST', postId } as const),
    setUserProfile: (profile: ProfileType) =>
        ({ type: 'SN/PROF/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string | undefined) =>
        ({ type: 'SN/PROF/SET_STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) =>
        ({ type: 'SN/PROF/SET_PHOTOS_SUCCESS', photos } as const),
    profileIsFetching: (isFetching: boolean) =>
        ({ type: 'SN/PROF/PROFILE_IS_FETCHING', isFetching } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>
export const getUserProfile = (id: number | undefined): ThunkType =>
    async (dispatch) => {
        dispatch(actions.profileIsFetching(true));
        const data = await profileAPI.getUserProfile(id)
        dispatch(actions.profileIsFetching(false));
        if (!data.contacts.mainLink) { data.contacts.mainLink = '' }
        dispatch(actions.setUserProfile(data));

    }

export const getStatus = (id: number): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.getStatus(id)
        dispatch(actions.setStatus(response.data));
    }

export const updateStatus = (status: string): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatus(status));
        }
        else if (response.data.resultCode === ResultCodeEnum.Error) {
            let errorStatusMessage = response.data.messages.length > 0
                ? response.data.messages[0]
                : "Some error";
            return Promise.reject(errorStatusMessage);
        }
    }
export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos));
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
