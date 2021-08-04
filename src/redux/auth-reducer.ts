import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const ERROR_LOGIN = 'ERROR_LOGIN'
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL'

export type InitialStateAuth = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    isError: boolean
    errorLoginMessage: string | null
    captchaUrl: string | null
}
let initialState: InitialStateAuth = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isError: false,
    errorLoginMessage: null,
    captchaUrl: null //if null captcha is not required
}
const authReducer = (state = initialState, action: any): InitialStateAuth => {
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
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}
type SetAuthUserDataActionDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataActionDataType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean):
    SetAuthUserDataActionType =>
    ({ type: SET_USER_DATA, data: { id, email, login, isAuth } })

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL
    captchaUrl: string | null
}
export const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlSuccessActionType =>
    ({ type: GET_CAPTCHA_URL, captchaUrl })

type ErrorLoginActionType = {
    type: typeof ERROR_LOGIN
    errorLoginMessage: string
}
export const errorLogin = (errorLoginMessage: string): ErrorLoginActionType =>
    ({ type: ERROR_LOGIN, errorLoginMessage })

export const authUserData = () => async (dispatch: any) => {
    const data = await authAPI.me();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) =>
    async (dispatch: any) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(authUserData())
            // Delete captcha after success
            dispatch(getCaptchaUrlSuccess(null))
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let errorLoginMessage = response.data.messages.length > 0
                ? response.data.messages[0]
                : "Some error";
            dispatch(errorLogin(errorLoginMessage))
        }
    }
export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer