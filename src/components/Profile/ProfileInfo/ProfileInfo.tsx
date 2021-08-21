import Preloader from '../../common/Preloader/Preloader';
import p from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userIcon from './../../../assets/userIcon.png'
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ProfileType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../../redux/profile-selector';
import { Upload, message, Button, Descriptions } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiKey } from '../../../api/api';
import { actions } from '../../../redux/profile-reducer';



export type ProfileInfoPropsType = {
  isOwner: boolean
  saveProfileInfo: (profile: ProfileType) => Promise<void>
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
  isOwner,
  saveProfileInfo }) => {


  const profile = useSelector(selectProfile)
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false);
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
      <div>< ProfileStatusWithHooks isOwner={isOwner} /></div>
      <div>
        <div>
          <img src={profile.photos.large || userIcon}
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
      <div>
        {editMode
          ? <ProfileDataForm setEditMode={setEditMode}
            profile={profile}
            saveProfileInfo={saveProfileInfo} />
          : <ProfileData profile={profile}
            isOwner={isOwner}
            goToEditMode={() => { setEditMode(true) }} />
        }
      </div>
    </div>
  );
}

type ProfileDataProps = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataProps> = ({ profile, isOwner, goToEditMode }) => {
  return <div style={{ marginTop: '30px', maxWidth: '700px' }}>
    <Descriptions
      title="Description"
      bordered
      column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Full name">{profile.fullName}</Descriptions.Item>
      <Descriptions.Item label="Looking a job">{profile.lookingForAJob ? 'yes' : 'no'}</Descriptions.Item>
      <Descriptions.Item label="About me">{profile.aboutMe}</Descriptions.Item>
      <Descriptions.Item label="Skills">{profile.lookingForAJobDescription}</Descriptions.Item>
      <Descriptions.Item label="Contacts">
        {Object.keys(profile.contacts)
          .map(key => {
            return <Contact key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]} />
          })}
      </Descriptions.Item>

    </Descriptions>
    <div>{isOwner &&
      <Button
        size={'small'}
        type='primary'
        style={{ minWidth: '150px', marginTop: '10px' }}
        onClick={goToEditMode}>Edit
      </Button>}</div>
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
