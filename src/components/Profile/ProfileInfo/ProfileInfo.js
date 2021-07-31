import Preloader from '../../common/Preloader/Preloader';
import p from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userIcon from './../../../assets/userIcon.png'
import { useState } from 'react';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {

  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
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
      {editMode
        ? <ProfileDataForm />
        : <ProfileData profile={profile}
          isOwner={isOwner}
          goToEditMode={() => { setEditMode(true) }} />
      }
    </div>
  );
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div className={p.description}>
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

const Contact = ({ contactTitle, contactValue }) => {
  return <div>{contactValue && <div><b>{contactTitle}:</b> {contactValue}</div>}</div>
}

const ProfileDataForm = ({ }) => {
  return <div>Edit</div>
}
export default ProfileInfo;
