import React, { useState } from 'react';
import { actions } from '../../../redux/profile-reducer';
import { ProfileEditForm } from './ProfileEditForm';
import { selectProfile } from '../../../redux/profile-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Descriptions,
  Modal,
  } from 'antd';

export const ProfileUserData: React.FC = () => {

  const profile = useSelector(selectProfile)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { userId }: any = useParams();
  const showModal = () => {
    setIsModalVisible(true);
    dispatch(actions.profileIsFetching(true))
  };
  return <div style={{ marginTop: '30px', maxWidth: '700px' }}>
    <Descriptions
      // title="Description"
      bordered
      column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Full name">{profile?.fullName}</Descriptions.Item>
      <Descriptions.Item label="Looking a job">{profile?.lookingForAJob ? 'yes' : 'no'}</Descriptions.Item>
      <Descriptions.Item label="About me">{profile?.aboutMe}</Descriptions.Item>
      <Descriptions.Item label="Skills">{profile?.lookingForAJobDescription}</Descriptions.Item>
      <Descriptions.Item label="Contacts">
        {profile && Object.keys(profile.contacts)
          .map(key => {
            let contactValue = profile?.contacts[key]
            return <div>
              {contactValue && <div><b>{key}:</b> {contactValue}<br /></div>}
            </div>
          })}
      </Descriptions.Item>
    </Descriptions>
    <div>{!userId &&
      <Button
        size={'small'}
        ghost
        type='primary'
        style={{ minWidth: '100px', marginTop: '10px' }}
        onClick={showModal}>Edit
      </Button>}</div>
    <Modal
      title="Profile"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <ProfileEditForm
        setIsModalVisible={setIsModalVisible}
      />
    </Modal>
  </div>
}