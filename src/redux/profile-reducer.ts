import { ResultCodeEnum } from '../api/api';
import { profileAPI } from '../api/profile-api';
import {
    PhotosType,
    PostData,
    ProfileType,
} from '../types/types';
import {
    BaseThunkType,
    InferActionsType,
} from './store';

let initialState = {
    postData: [
        { id: 2, message: "The heart of the prudent getteth knowledge; and the ear of the wise seeketh knowledge.", likesCount: 12 },
        { id: 1, message: "A wise king scattereth the wicked, and bringeth the wheel over them.", likesCount: 2 },
    ] as Array<PostData>,
    profile: undefined as ProfileType | undefined,
    status: '' as string | undefined,
    isFetching: false,
    isLoaded: false,
    newPostText: '',
    profileErrorMessage: '' as string | undefined
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
                postData: [newPost, ...state.postData],
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
        case "SN/PROF/PROFILE_IS_LOADED":
            return { ...state, isLoaded: action.isLoaded }
        case "SN/PROF/PROFILE_SAVE_ERROR_MESSAGE":
            return { ...state, profileErrorMessage: action.profileErrorMessage }
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
        ({ type: 'SN/PROF/PROFILE_IS_FETCHING', isFetching } as const),
    profileIsLoaded: (isLoaded: boolean) =>
        ({ type: 'SN/PROF/PROFILE_IS_LOADED', isLoaded } as const),
    profileSaveErrorMessage: (profileErrorMessage: string) =>
        ({ type: 'SN/PROF/PROFILE_SAVE_ERROR_MESSAGE', profileErrorMessage } as const),
}

type ThunkType = BaseThunkType<ActionsTypes>
export const getUserProfile = (id: string | undefined): ThunkType =>
    async (dispatch) => {
        dispatch(actions.profileIsFetching(true));
        const res = await profileAPI.getUserProfile(id)
        dispatch(actions.setUserProfile(res.data));
        dispatch(actions.profileIsFetching(false));
        dispatch(actions.profileIsLoaded(true));
    }

export const getStatus = (id: string): ThunkType =>
    async (dispatch) => {
        const res = await profileAPI.getStatus(id)
        dispatch(actions.setStatus(res.data));
    }

export const updateStatus = (status: string | undefined): ThunkType =>
    async (dispatch) => {
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatus(status));
        }
        else if (res.data.resultCode === ResultCodeEnum.Error) {
            let errorStatusMessage = res.data.messages.length > 0
                ? res.data.messages[0]
                : "Some error";
            return Promise.reject(errorStatusMessage);
        }
    }
export const saveProfileInfo = (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.id;
        const res = await profileAPI.saveProfileInfo(profile)
        if (res.data.resultCode === ResultCodeEnum.Success) {
            dispatch(getUserProfile(userId));
        }
        else {
            let errorLoginMessage = res.data.messages.length > 0
                ? res.data.messages[0]
                : "Some error";
            dispatch(actions.profileSaveErrorMessage(errorLoginMessage))
        }
    }
// export const savePhoto = (file: File): ThunkType =>
//     async (dispatch) => {
//         const response = await profileAPI.savePhoto(file)
//         if (response.data.resultCode === ResultCodeEnum.Success) {
//             dispatch(actions.savePhotoSuccess(response.data.data.photos));
//         }
//     }

export default profileReducer;
