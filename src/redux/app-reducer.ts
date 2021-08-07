import { authUserData } from "./auth-reducer";
import { InferActionsType } from "./store";

let initialState = {
    initialized: false
}
type InitialState = typeof initialState
const appReducer = (state = initialState, action: ActionsTypes):
    InitialState => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authUserData());
    promise.then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer