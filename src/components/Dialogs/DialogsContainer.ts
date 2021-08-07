import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialog-reducer'
import { AppStateType } from '../../redux/store';
import Dialogs from './Dialogs'

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, { postNewMesageBody: actions.postNewMesageBody }),
    withAuthRedirect
)(Dialogs);