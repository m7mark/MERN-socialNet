import { InferActionsType } from "./store";

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
const dialogsReducer = (state = initialState, action: ActionsTypes):
    InitialStateDialogs => {
    switch (action.type) {
        case 'SN/DIAL/ADD_NEW_MESSAGE':
            return {
                ...state,
                messagesData: [...state.messagesData,
                { id: state.messagesData.length + 1, message: action.newText }],
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    postNewMesageBody: (newText: string) =>
        ({ type: 'SN/DIAL/ADD_NEW_MESSAGE', newText: newText } as const)
}

export default dialogsReducer;