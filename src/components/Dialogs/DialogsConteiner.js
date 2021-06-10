import { connect } from 'react-redux';
import { updateNewMeesageBodyCreator } from '../../redux/dialog-reducer'
import { sendMessageCreator } from '../../redux/dialog-reducer'
import Dialogs from './Dialogs'

// const DialogsConteiner = (props) => {

//     // let state = props.store.getState();

//     // let SendClick = () => {
//     //     props.store.dispatch(sendMessageCreator())
//     // }
//     // let newMessageChange = (body) => {
//     //     props.store.dispatch(updateNewMeesageBodyCreator(body))
//     // }

//     return <Dialogs
//         updateNewMessage={newMessageChange}
//         SendClick={SendClick}
//         dialogsData={state.dialogsPage.dialogsData}
//         messagesData={state.dialogsPage.messagesData}
//         newMessageBody={state.dialogsPage.newMessageBody}
//     />
// }

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
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

const DialogsConteiner = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsConteiner;