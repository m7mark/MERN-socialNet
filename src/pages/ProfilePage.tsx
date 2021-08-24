import { AntPreloader } from '../components/UI/AntPreloader';
import { Col, Row } from 'antd';
import { getStatus, getUserProfile } from '../redux/profile-reducer';
import { MyPostsAddPostForm } from '../components/Profile/MyPostsAddPostForm';
import { MyPostsList } from '../components/Profile/MyPostsList';
import { ProfileImage } from '../components/Profile/ProfileInfo/ProfileImage';
import { ProfileStatus } from '../components/Profile/ProfileInfo/ProfileStatus';
import { ProfileUserData } from '../components/Profile/ProfileInfo/ProfileUserData';
import { selectAuthId, selectIsFetching } from '../redux/profile-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const ProfilePage: React.FC = () => {
  const isFetching = useSelector(selectIsFetching)
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
  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { refreshProfile() }, [userId])

  return (
    <div>
      <div>
        {isFetching
          ? <div style={{ minHeight: '580px' }}><AntPreloader /> </div>
          : <div>
            <ProfileStatus />
            <ProfileImage />
            <ProfileUserData />
          </div>}
        <div style={{ marginTop: '30px' }}>
          <Row>
            <Col style={{ maxWidth: '800px' }} md={22} sm={24} xs={24} >
              <MyPostsAddPostForm />
              <MyPostsList />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default withAuthRedirect(ProfilePage);
