import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const ERROR_LOGIN = 'ERROR_LOGIN'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isError: false,
    errorLoginMessage: null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isError: false
            }
        case ERROR_LOGIN:
            return {
                ...state,
                isError: true,
                errorLoginMessage: action.errorLoginMessage
            }
        default:
            return state;
    }
}
export const setAuthUserData = (id, email, login, isAuth) =>
    ({ type: SET_USER_DATA, data: { id, email, login, isAuth } })

export const errorLogin = (errorLoginMessage) =>
    ({ type: ERROR_LOGIN, errorLoginMessage })

export const authUserData = () => async (dispatch) => {
    const data = await authAPI.me();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(authUserData())
    }
    else {
        let errorLoginMessage = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error";
        dispatch(errorLogin(errorLoginMessage))
    }
}
export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer