import React from 'react';
import p from './MyPosts.module.css';
import Post from './Post/Post';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../common/FormsControl/MyForms';

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
      validationSchema={Yup.object({
        newPostBodyText: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required')
      })}
      onSubmit={submit}
    >
      <Form>
        <MyTextInput
          id="newPostBodyText"
          name="newPostBodyText"
          type="text"
          placeholder="Post message"
        />
        <br />
        <button type="submit">Add Post</button>
      </Form>
    </Formik>
  );
};
