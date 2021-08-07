import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialog-reducer'
import Dialogs from './Dialogs'

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
export default compose(
    connect(mapStateToProps, { postNewMesageBody: actions.postNewMesageBody }),
    withAuthRedirect
)(Dialogs);