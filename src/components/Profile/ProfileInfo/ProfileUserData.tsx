import React, { useState } from 'react';
import { actions } from '../../../redux/profile-reducer';
import {
  Button,
  Col,
  Descriptions,
  Modal,
  Row,
  Skeleton,
  Typography
} from 'antd';
import { ProfileEditForm } from './ProfileEditForm';
import { selectAuthId } from '../../../redux/auth-selector';
import { selectIsFetching, selectProfile } from '../../../redux/profile-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

export const ProfileUserData: React.FC = () => {

  const profile = useSelector(selectProfile)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch()
  const authorizedUserId = useSelector(selectAuthId)
  const isFetching = useSelector(selectIsFetching)
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { userId } = useParams();
  const showModal = () => {
    setIsModalVisible(true);
    dispatch(actions.profileIsLoaded(false))
  };

  return <div style={{ marginTop: '30px' }}>
    <Row>
      <Col style={{ maxWidth: '800px' }} md={24} sm={24} xs={24}>
        {isFetching
          ? <Skeleton active title={false} paragraph={{ rows: 4 }} />
          : <Descriptions
            // title="Description"
            bordered
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Full name">
              {profile?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Looking a job">
              {profile?.lookingForAJob ? 'yes' : 'no'}
            </Descriptions.Item>
            {profile?.aboutMe && <Descriptions.Item label="About me">
              {profile?.aboutMe}</Descriptions.Item>}
            {profile?.lookingForAJobDescription && <Descriptions.Item label="Skills">
              {profile?.lookingForAJobDescription}
            </Descriptions.Item>}
            <Descriptions.Item label="Contacts">
              {profile && Object.keys(profile.contacts)
                .map(key => {
                  let contactValue = profile?.contacts[key] as string
                  return <div key={key}>
                    {contactValue && <div><b>{key}: </b>
                      <Text copyable={{ tooltips: false }}>{contactValue}</Text>
                    </div>}
                  </div>
                })}
            </Descriptions.Item>
          </Descriptions>}
      </Col>
    </Row>
    <div>{(!userId || userId === authorizedUserId) &&
      <Button
        // type='primary'
        size='large'
        className='profile-image-button'
        ghost type='primary'
        style={{ marginTop: '10px' }}
        onClick={showModal}>Edit Profile
      </Button>}</div>
    <Modal
      title="Profile" visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <ProfileEditForm
        setIsModalVisible={setIsModalVisible}
      />
    </Modal>
  </div>
}