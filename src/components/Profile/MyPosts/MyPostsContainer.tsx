import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/store';
import MyPosts from './MyPosts';

const mapStateToProps = (state: AppStateType) => {
  return {
    postData: state.profilePage.postData
  }
}

export default compose(
  connect(mapStateToProps, { addNewPostBody: actions.addNewPostBody })
)(MyPosts)
