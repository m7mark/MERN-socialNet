import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from './../../../redux/profile-reducer'
import { updateNewPostTextActionCreator } from './../../../redux/profile-reducer'
import MyPosts from './MyPosts';

// const MyPostsContainer = (props) => {

//   let state = props.store.getState();

//   let addPost = () => {
//     props.store.dispatch(addPostActionCreator());
//   }

//   let onPostChange = (text) => {
//     props.store.dispatch(updateNewPostTextActionCreator(text));
//   }

//   return (<MyPosts
//     updateNewPostText={onPostChange}
//     addPost={addPost}
//     newPostText={state.profilePage.newPostText}
//     postData={state.profilePage.postData} />);
// }

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

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
