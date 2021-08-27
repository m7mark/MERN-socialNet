import { AppStateType } from "./store";

export const selectStatus = (state: AppStateType) => {
    return state.profilePage.status
}
export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile
}
export const selectIsFetching = (state: AppStateType) => {
    return state.profilePage.isFetching
}
export const selectIsLoaded = (state: AppStateType) => {
    return state.profilePage.isLoaded
}
export const selectProfileErrorMessage = (state: AppStateType) => {
    return state.profilePage.profileErrorMessage
}
export const selectUserId = (state: AppStateType) => {
    return state.profilePage.profile?.userId
}

