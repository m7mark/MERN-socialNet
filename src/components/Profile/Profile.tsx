import Preloader from '../common/Preloader/Preloader';
import { MyPosts } from './MyPosts';
import { ProfileImage } from './ProfileInfo/ProfileImage';
import { ProfileStatus } from './ProfileInfo/ProfileStatus';
import { ProfileUserData } from './ProfileInfo/ProfileUserData';
import { selectAuthId, selectProfile } from '../../redux/profile-selector';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, getUserProfile } from '../../redux/profile-reducer';
import { useEffect } from 'react';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const Profile: React.FC = () => {
  const profile = useSelector(selectProfile)
  const history = useHistory()
  const dispatch = useDispatch()
  const authorizedUserId = useSelector(selectAuthId)
  let { userId }: any = useParams()

  const refreshProfile = () => {
    if (!userId) { userId = authorizedUserId }
    if (!userId) { history.push("/login") }
    // if (!userId) { throw new Error('ID should exists') }
    else {
      dispatch(getUserProfile(userId));
      dispatch(getStatus(userId))
    }
  }
  useEffect(() => { refreshProfile() }, [])
  useEffect(() => { refreshProfile() }, [userId])

  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <div>
        <ProfileStatus />
        <ProfileImage />
        <ProfileUserData />
        <MyPosts />
      </div>
    </div>
  );
}

export default withAuthRedirect(Profile);
