import dialogsReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {

        profilePage: {
            postData: [
                { id: 1, message: "How are you", likesCount: 12 },
                { id: 2, message: "Good and you", likesCount: 2 },
            ],
            newPostText: 'tratatatata'
        },
        dialogsPage: {
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
        },
        sidebar: { 
        }
    },
    _callSubscriber() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber();
    }
}

export default store;