import React from 'react';
import p from './MyPosts.module.css';
import Post from './Post/Post';
import { Formik, Form, Field } from 'formik';

const MyPosts = (props) => {

  let postElements =
    props.profilePage.postData.map(posts =>
      <Post message={posts.message} likesCount={posts.likesCount} />)

  return (
    <div className={p.postblock}>
      <h3>My Post</h3>
      <div>
        <AddPostForm addNewPostBody={props.addNewPostBody} />
      </div>
      <div className={p.posts}>
        {postElements}
      </div>
    </div>

  );
}

export default MyPosts;

const AddPostForm = ({ addNewPostBody }) => {
  const submit = (values, { resetForm }) => {
    addNewPostBody(values.newPostBodyText)
    resetForm({})
  }
  return (
    <Formik
      initialValues={{ newPostBodyText: "" }}
      onSubmit={submit}
    >
      <Form>
        <Field
          id="newPostBodyText"
          name="newPostBodyText"
        />
        <br />
        <button type="submit">Add Post</button>
      </Form>
    </Formik>
  );
};
