const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    postData: [
        { id: 1, message: "How are you", likesCount: 12 },
        { id: 2, message: "Good and you", likesCount: 2 },
    ],
    newPostText: ''
}
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let message = state.newPostText
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }

        /*         let stateCopy = {...state};
                let newPost = {
                    id: 5,
                    message: state.newPostText,
                    likesCount: 0
                };
                stateCopy.postData = [...state.postData]
                stateCopy.postData.push(newPost);
                stateCopy.newPostText = '';
                return stateCopy; */

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.text
            }
        default:
            return state;
    }
}

export let addPostActionCreator = () => ({ type: ADD_POST });
export let updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, text: text })

export default profileReducer;
