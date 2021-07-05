import { connect } from 'react-redux';
import { compose } from 'redux';
import { addNewPostBody } from './../../../redux/profile-reducer'
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData
  }
}

export default compose(
  connect(mapStateToProps, { addNewPostBody })
)(MyPosts)
