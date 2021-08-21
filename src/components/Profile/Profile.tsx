import ProfileInfo, { ProfileInfoPropsType } from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';

type PropsType = {
  isFetching?: boolean;
} & Omit<ProfileInfoPropsType, 'isFetching'>;
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      {props.isFetching ? <Preloader /> :
        <div>
          <ProfileInfo
            isOwner={props.isOwner}
            saveProfileInfo={props.saveProfileInfo} />
          <MyPostsContainer />
        </div>}
    </div>
  );
}
export default Profile;
