import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/store';
import MyPosts, { MyPostsDispatchProps, MyPostsProps } from './MyPosts';

const mapStateToProps = (state: AppStateType) => {
  return {
    postData: state.profilePage.postData
  }
}

export default compose(
  connect<MyPostsProps, MyPostsDispatchProps, {}, AppStateType>
    (mapStateToProps, { addNewPostBody: actions.addNewPostBody })
)(MyPosts)
