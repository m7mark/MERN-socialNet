import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { userAPI } from "../api/api";
import { updateObjectInArray } from "../components/utils/object-helpers";
import { UserType } from "../types/types";
import { AppStateType } from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // Array of Users Id
    // fake: 10
}
type InitialState = typeof initialState
const usersReducer = (state = initialState, action: ActionsTypes):
    InitialState => {
    switch (action.type) {
        // case "FAKE": return { ...state, fake: state.fake + 1 }
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: true }
                )
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", { followed: false }
                )
            }
        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType |
    SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType |
    ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number):
    FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number):
    UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):
    SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number):
    SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalCount: number):
    SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalCount });

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean):
    ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number):
    ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, id));
    const data = await apiMethod(id)
    if (data.resultCode === 0) { dispatch(actionCreator(id)) }
    dispatch(toggleFollowingProgress(false, id));
}

export const getUsers = (currentPage: number, pageSize: number) =>
    async (dispatch: Dispatch<ActionsTypes>, getstate: () => AppStateType) => {
        dispatch(toggleIsFetching(true));
        const data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
export const follow = (id: number) => {
    return async (dispatch: any) => {
        let apiMethod = userAPI.follow.bind(userAPI);
        followUnfollowFlow(dispatch, id, apiMethod, followSuccess);
    }
}
export const unfollow = (id: number) => (dispatch: any) => {
    let apiMethod = userAPI.unfollow.bind(userAPI);
    followUnfollowFlow(dispatch, id, apiMethod, unfollowSuccess);
}

export default usersReducer;
