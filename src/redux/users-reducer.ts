import { Dispatch } from 'redux';

import { CommonDataResponseType } from '../api/api';
import { userAPI } from '../api/users-api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import {
  BaseThunkType,
  InferActionsType,
} from './store';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of Users Id
    filter: {
        term: '',
        friend: null as null | boolean
    },
}
export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
const usersReducer = (state = initialState, action: ActionsTypes):
    InitialState => {
    switch (action.type) {
        case 'SN/USER/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: true }
                )
            }

        case 'SN/USER/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: false }
                )
            }
        case 'SN/USER/SET_USERS':
            return { ...state, users: action.users }

        case 'SN/USER/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }

        case 'SN/USER/SET_PAGE_SIZE':
            return { ...state, pageSize: action.pageSize }

        case 'SN/USER/SET_FILTER':
            return { ...state, filter: action.payload }

        case 'SN/USER/SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.count }

        case 'SN/USER/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }

        case 'SN/USER/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    followSuccess: (userId: number) =>
        ({ type: 'SN/USER/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) =>
        ({ type: 'SN/USER/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) =>
        ({ type: 'SN/USER/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) =>
        ({ type: 'SN/USER/SET_CURRENT_PAGE', currentPage } as const),
    setPageSize: (pageSize: number) =>
        ({ type: 'SN/USER/SET_PAGE_SIZE', pageSize } as const),
    setFilter: (filter: FilterType) =>
        ({ type: 'SN/USER/SET_FILTER', payload: filter } as const),
    setTotalUsersCount: (totalCount: number) =>
        ({ type: 'SN/USER/SET_TOTAL_USERS_COUNT', count: totalCount } as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({ type: 'SN/USER/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: 'SN/USER/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}
type ThunkType = BaseThunkType<ActionsTypes>
const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsTypes>,
    id: number,
    apiMethod: (id: number) => Promise<CommonDataResponseType>,
    actionCreator: (id: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, id));
    let res = await apiMethod(id)
    if (res.data.resultCode === 0) { dispatch(actionCreator(id)) }
    dispatch(actions.toggleFollowingProgress(false, id));
}
export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setPageSize(pageSize));
        dispatch(actions.setFilter(filter));
        const res = await userAPI.getUsers(
            currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(res.data.items));
        dispatch(actions.setTotalUsersCount(res.data.totalCount));
    }
export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = userAPI.follow.bind(userAPI);
        await _followUnfollowFlow(dispatch, id, apiMethod, actions.followSuccess);
    }
}
export const unfollow = (id: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = userAPI.unfollow.bind(userAPI);
        await _followUnfollowFlow(dispatch, id, apiMethod, actions.unfollowSuccess);
    }
}
export default usersReducer;
