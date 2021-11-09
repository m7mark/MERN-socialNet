import { Col, Row } from 'antd';
import { getStatus, getUserProfile } from '../redux/profile-reducer';
import { MyPostsAddPostForm } from '../components/Profile/PostList/MyPostsAddPostForm';
import { MyPostsList } from '../components/Profile/PostList/MyPostsList';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ProfileImage } from '../components/Profile/ProfileInfo/ProfileImage';
import { ProfileStatus } from '../components/Profile/ProfileInfo/ProfileStatus';
import { ProfileUserData } from '../components/Profile/ProfileInfo/ProfileUserData';
import { selectAuthId } from '../redux/auth-selector';
import { selectProfile } from '../redux/profile-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProfilePage: React.FC = () => {
  const profile = useSelector(selectProfile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authorizedUserId = useSelector(selectAuthId)
  let { userId } = useParams()
  const [currentProfileId, setCurrentProfileId] = useState<string | undefined>(profile?.userId)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (!authorizedUserId) { navigate('/login') }
    else if (!userId) { navigate(`/profile/${authorizedUserId}`) }
    else if (userId === currentProfileId) { return }
    else {
      dispatch(getUserProfile(userId))
      dispatch(getStatus(userId))
      setCurrentProfileId(userId)
    }
  }, [userId, authorizedUserId, navigate, dispatch, currentProfileId])

  return (
    <>
      {!authorizedUserId && (< Navigate to="/login" replace={true} />)}
      <div>
        <div>
          <div>
            <ProfileStatus />
            <ProfileImage />
            <ProfileUserData />
          </div>
          {(!userId || userId === authorizedUserId) &&
            <div style={{ marginTop: '30px' }}>
              <Row>
                <Col style={{ maxWidth: '800px' }} md={24} sm={24} xs={24} >
                  <MyPostsAddPostForm />
                  <MyPostsList />
                </Col>
              </Row>
            </div>}
        </div>
      </div>
    </>
  )
}

export default ProfilePage;
