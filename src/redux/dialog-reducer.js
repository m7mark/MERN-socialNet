const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "What about your story" },
        { id: 3, message: "I don't remember" },
        { id: 4, message: "I'll wait you" },
        { id: 5, message: "You" }
    ],
    dialogsData: [
        { id: 1, name: 'Mark' },
        { id: 2, name: 'Mig' },
        { id: 3, name: 'Pash' },
        { id: 4, name: 'Sher' },
        { id: 5, name: 'Nastya' }
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: body }],
                newMessageBody: ''
            }
        default:
            return state;
    }
}
export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMeesageBodyCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })

export default dialogsReducer;