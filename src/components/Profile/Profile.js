import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {

  return (
    <div>
      {props.isFetching ? <Preloader /> :
        <div>
          <ProfileInfo
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            isOwner={props.isOwner}
            savePhoto={props.savePhoto} />
          <MyPostsContainer />
        </div>}
    </div>
  );
}
export default Profile;
