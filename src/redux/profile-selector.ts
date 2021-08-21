import { AppStateType } from "./store";

export const selectStatus = (state: AppStateType) => {
    return state.profilePage.status
}
