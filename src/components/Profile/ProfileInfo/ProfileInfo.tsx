import Preloader from '../../common/Preloader/Preloader';
import p from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userIcon from './../../../assets/userIcon.png'
import { ChangeEvent, useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ProfileType } from '../../../types/types';


export type ProfileInfoPropsType = {
  profile: ProfileType | null
  status: string | undefined
  updateStatus: (status: string | undefined) => Promise<void>
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfileInfo: (profile: ProfileType) => Promise<void>
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfileInfo }) => {

  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }
  return (
    <div>
      <div>< ProfileStatusWithHooks status={status} updateStatus={updateStatus} /></div>
      <div className={p.description}>
        <div>
          <img src={profile.photos.large || userIcon}
            className={p.profileimg} alt="" ></img>
        </div>
        <div>
          {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
        </div>
      </div>
      <div className={p.description}>
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
  return <div>
    <div>{isOwner && <button onClick={goToEditMode}>Edit</button>}</div>
    <div><b>Full name: </b>{profile.fullName}</div>
    <div><b>About me: </b>{profile.aboutMe}</div>
    <div><b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}</div>
    {profile.lookingForAJob &&
      <div> <b>Skills: </b>{profile.lookingForAJobDescription}</div>
    }
    <div><b>Contacts: </b>{Object.keys(profile.contacts)
      .map(key => {
        return <Contact key={key}
          contactTitle={key}
          contactValue={profile.contacts[key]} />
      })}</div>
  </div>
}

type ContactProps = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactProps> = ({ contactTitle, contactValue }) => {
  return <div>{contactValue && <div><b>{contactTitle}:</b> {contactValue}</div>}</div>
}

export default ProfileInfo;
