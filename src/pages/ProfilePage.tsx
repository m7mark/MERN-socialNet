/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from 'antd';
import { getStatus, getUserProfile } from '../redux/profile-reducer';
import { MyPostsAddPostForm } from '../components/Profile/MyPostsAddPostForm';
import { MyPostsList } from '../components/Profile/MyPostsList';
import { ProfileImage } from '../components/Profile/ProfileInfo/ProfileImage';
import { ProfileStatus } from '../components/Profile/ProfileInfo/ProfileStatus';
import { ProfileUserData } from '../components/Profile/ProfileInfo/ProfileUserData';
import { selectAuthId } from '../redux/auth-selector';
import { selectProfile } from '../redux/profile-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

export type ParamsUserIdType = {
  userId: string
}
const ProfilePage: React.FC = () => {
  const profile = useSelector(selectProfile)
  const history = useHistory()
  const dispatch = useDispatch()
  const authorizedUserId = useSelector(selectAuthId)
  let { userId } = useParams<ParamsUserIdType>()
  const [isProfileChanging, setIsProfileChanging] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState<number | undefined>(profile?.userId)

  const refreshProfile = () => {
    if (!userId) { userId = String(authorizedUserId) }
    if (!userId) { history.push("/login") }
    else {
      dispatch(getUserProfile(+userId));
      dispatch(getStatus(+userId))
    }
  }
  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { refreshProfile() }, [userId])
  useEffect(() => {
    if (currentProfileId !== +userId) {
        setIsProfileChanging(true)
        setCurrentProfileId(+userId)
    }
    else {
        setIsProfileChanging(false)
    }
}, [userId]);

  return (
    <div>
      <div>
           <div>
            <ProfileStatus isProfileChanging={isProfileChanging}/>
            <ProfileImage isProfileChanging={isProfileChanging}/>
            <ProfileUserData isProfileChanging={isProfileChanging}/>
          </div>
        {(!userId || +userId === authorizedUserId) &&
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
  )
}

export default withAuthRedirect(ProfilePage);
