import { Dispatch } from "redux";
import { chatApi, StatusType } from "../api/chat-api";
import { ChatMessageType } from "../pages/Chat/ChatPage";
import { BaseThunkType, InferActionsType } from "./store";

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}
export type InitialStateAuth = typeof initialState
const chatReducer = (state = initialState, action: ActionsTypes):
    InitialStateAuth => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECIEVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case 'SN/CHAT/MESSAGES_CLEANED':
            return {
                ...state,
                messages: []
            }
        case 'SN/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    messagesRecieved: (messages: ChatMessageType[]) =>
        ({ type: 'SN/CHAT/MESSAGES_RECIEVED', payload: { messages } } as const),
    messagesCleaned: () =>
        ({ type: 'SN/CHAT/MESSAGES_CLEANED' } as const),
    statusChanged: (status: StatusType) =>
        ({ type: 'SN/CHAT/STATUS_CHANGED', payload: { status } } as const),
}

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        return _newMessagesHandler = (messages) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }
    return _newMessagesHandler
}

let _newStatusHandler: ((status: StatusType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null || _newStatusHandler === undefined) {
        return _newStatusHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _newStatusHandler
}


type ThunkType = BaseThunkType<ActionsTypes>
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    dispatch(actions.messagesCleaned())
    chatApi.subscribe('messages-recieved', newMessagesHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe('messages-recieved', newMessagesHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
    chatApi.stop()
}
export const sendMessage = (message: string):
    ThunkType => async (dispatch) => {
        chatApi.sendMessage(message)
    }

export default chatReducer