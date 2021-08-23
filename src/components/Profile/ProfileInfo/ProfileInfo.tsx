import p from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import React, { useState } from 'react';
import userIcon from './../../../assets/userIcon.png';
import { actions } from '../../../redux/profile-reducer';
import { apiKey } from '../../../api/api';
import {
  Button,
  Descriptions,
  message,
  Modal,
  Upload
  } from 'antd';
import { ProfileDataForm } from './ProfileDataForm';
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';
import { ProfileType } from '../../../types/types';
import { selectProfile, selectProfileErrorMessage } from '../../../redux/profile-selector';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

export type ProfileInfoPropsType = {
  isOwner: boolean
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
  isOwner }) => {

  const profile = useSelector(selectProfile)
  const dispatch = useDispatch()
  const props = {
    name: 'image',
    action: 'https://social-network.samuraijs.com/api/1.0/profile/photo',
    headers: {
      'API-KEY': apiKey,
    },
    withCredentials: true,
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} uploaded successfully`);
        dispatch(actions.savePhotoSuccess(info.file.response.data.photos))
      } else if (info.file.status === 'error') {
        message.error(`Upload failed: ${info.file.response.message}`);
      }
    },
  };

  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      < ProfileStatusWithHooks isOwner={isOwner} />
      <div>
        <div>
          <img src={profile?.photos.large || userIcon}
            className={p.profileimg} alt="" ></img>
        </div>
        <div >
          {isOwner && <Upload {...props}>
            <Button
              ghost
              type='primary'
              icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>}
        </div>
      </div>
      <ProfileData profile={profile} isOwner={isOwner} />
    </div>
  );
}

type ProfileDataProps = {
  profile: ProfileType | undefined
  isOwner: boolean
}
const ProfileData: React.FC<ProfileDataProps> = ({ profile, isOwner }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
    dispatch(actions.profileIsFetching(true))
  };
  // const memoProfile = useMemo(() => { return { ...profile } }, [profile])
  return <div style={{ marginTop: '30px', maxWidth: '700px' }}>
    <Descriptions
      title="Description"
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
            return <Contact key={key}
              contactTitle={key}
              contactValue={profile?.contacts[key]} />
          })}
      </Descriptions.Item>
    </Descriptions>
    <div>{isOwner &&
      <Button
        // size={'small'}
        type='primary'
        style={{ minWidth: '150px', marginTop: '10px' }}
        onClick={showModal}>Edit
      </Button>}</div>
    <Modal
      title="Profile"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <ProfileDataForm
        setIsModalVisible={setIsModalVisible}
      />
    </Modal>
  </div>
}

type ContactProps = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactProps> = ({ contactTitle, contactValue }) => {
  return <div>{contactValue && <div><b>{contactTitle}:</b> {contactValue}<br /></div>}</div>
}

export default ProfileInfo;
