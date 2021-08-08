import ProfileInfo, { ProfileInfoProps } from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';

type ProfileProps = {
  isFetching?: boolean;
} & Omit<ProfileInfoProps, 'isFetching'>;
const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <div>
      {props.isFetching ? <Preloader /> :
        <div>
          <ProfileInfo
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            isOwner={props.isOwner}
            savePhoto={props.savePhoto}
            saveProfileInfo={props.saveProfileInfo} />
          <MyPostsContainer />
        </div>}
    </div>
  );
}
export default Profile;
