import p from './Post.module.css'

const Post = (props) => {
  return (
    <div className={p.item}>
      <div>
        <img src="https://image.flaticon.com/icons/png/512/168/168724.png" />
        {props.message}
      </div>
      <div>
        Like {props.likesCount}
      </div>
    </div>
  );
}

export default Post;
