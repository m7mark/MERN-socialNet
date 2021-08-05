const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

type MessagesData = {
    id: number
    message: string
}
type DialogsData = {
    id: number
    name: string
}

let initialState = {
    messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "What about your story" },
        { id: 3, message: "I don't remember" },
        { id: 4, message: "I'll wait you" },
        { id: 5, message: "You" }
    ] as Array<MessagesData>,
    dialogsData: [
        { id: 1, name: 'Mark' },
        { id: 2, name: 'Mig' },
        { id: 3, name: 'Pash' },
        { id: 4, name: 'Sher' },
        { id: 5, name: 'Nastya' }
    ] as Array<DialogsData>
}
export type InitialStateDialogs = typeof initialState
const dialogsReducer = (state = initialState, action: any):
    InitialStateDialogs => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData,
                { id: 6, message: action.newText }],
            }
        default:
            return state;
    }
}
type PostNewMesageBodyActionType = {
    type: typeof ADD_NEW_MESSAGE
    newText: string
}
export const postNewMesageBody = (newText: string):
    PostNewMesageBodyActionType =>
    ({ type: ADD_NEW_MESSAGE, newText: newText })

export default dialogsReducer;