import ProfileInfo, { ProfileInfoPropsType } from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';

type PropsType = {
  isFetching?: boolean;
} & Omit<ProfileInfoPropsType, 'isFetching'>;
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      
        <div>
          <ProfileInfo
            isOwner={props.isOwner}
          />
          <MyPostsContainer />
        </div>
    </div>
  );
}
export default Profile;
