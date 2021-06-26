import { connect } from 'react-redux';
import { updateNewMeesageBodyCreator } from '../../redux/dialog-reducer'
import { sendMessageCreator } from '../../redux/dialog-reducer'
import Dialogs from './Dialogs'

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessage: (body) => {
            dispatch(updateNewMeesageBodyCreator(body))
        },
        SendClick: () => {
            dispatch(sendMessageCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;