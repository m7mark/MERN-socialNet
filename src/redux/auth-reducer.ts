import {
    ResultCodeEnum,
    ResultCodeForCaptchaEnum,
} from '../api/api';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import {
    BaseThunkType,
    InferActionsType,
} from './store';

let initialState = {
    id: undefined as string | undefined,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isError: false,
    errorLoginMessage: null as string | null,
    captchaUrl: null as string | null //if null captcha is not required
}
export type InitialStateAuth = typeof initialState
const authReducer = (state = initialState, action: ActionsTypes):
    InitialStateAuth => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isError: false
            }
        case 'SN/AUTH/ERROR_LOGIN':
            return {
                ...state,
                isError: true,
                errorLoginMessage: action.errorLoginMessage
            }
        case 'SN/AUTH/GET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    setAuthUserData: (id: string | undefined, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'SN/AUTH/SET_USER_DATA', data: { id, email, login, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string | null) =>
        ({ type: 'SN/AUTH/GET_CAPTCHA_URL', captchaUrl } as const),
    errorLogin: (errorLoginMessage: string) =>
        ({ type: 'SN/AUTH/ERROR_LOGIN', errorLoginMessage } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>
export const authUserData = ():
    ThunkType => async (dispatch) => {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCodeEnum.Success) {
            let { id, email, login } = res.data.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null):
    ThunkType => async (dispatch) => {
        const res = await authAPI.login(email, password, rememberMe, captcha)
        if (res.data.resultCode === ResultCodeEnum.Success) {
            const token = res.data.data.token
            token && localStorage.setItem('token', token)
            dispatch(authUserData())
            // Delete captcha after success
            dispatch(actions.getCaptchaUrlSuccess(null))
        }
        else {
            if (res.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let errorLoginMessage = res.data.messages.length > 0
                ? res.data.messages[0]
                : "Some error";
            dispatch(actions.errorLogin(errorLoginMessage))
        }
    }
export const logout = ():
    ThunkType => async (dispatch) => {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(undefined, null, null, false))
        }
    }
export const getCaptchaUrl = ():
    ThunkType => async (dispatch) => {
        const res = await securityAPI.getCaptchaUrl()
        const captchaUrl = res.data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }

export default authReducer