import { connect } from 'react-redux';
import { compose } from 'redux';
import { addPostActionCreator } from './../../../redux/profile-reducer'
import { updateNewPostTextActionCreator } from './../../../redux/profile-reducer'
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextActionCreator(text));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MyPosts)
