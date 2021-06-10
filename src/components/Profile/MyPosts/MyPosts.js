import React from 'react';
import p from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

  let postElements =
    props.profilePage.postData.map(posts =>
       <Post message={posts.message} likesCount={posts.likesCount} />)

  let newPostEl = React.createRef();
  
  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostEl.current.value;
    props.updateNewPostText(text);
  }

  return (
    <div className={p.postblock}>
      <h3>My Post</h3>
      <div>
        <textarea onChange={onPostChange} ref={newPostEl}
          value={props.profilePage.newPostText} />
      </div>
      <div>
        <button onClick={onAddPost}>Post</button>
      </div>
      <div className={p.posts}>
        {postElements}
      </div>
    </div>

  );
}

export default MyPosts;
