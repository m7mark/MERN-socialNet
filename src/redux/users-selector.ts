import { createSelector } from "reselect";
import { AppStateType } from "./store";

const getUsersFromStateSelector = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getUsersFromState = createSelector(
    getUsersFromStateSelector, (users) => {
        return users.filter(u => true);
    })

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}   
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter;
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}