const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {

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
export const postNewMesageBody = (newText) =>
    ({ type: ADD_NEW_MESSAGE, newText: newText })

export default dialogsReducer;