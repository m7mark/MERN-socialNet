import Preloader from '../../common/Preloader/Preloader';
import p from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userIcon from './../../../assets/userIcon.png'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
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
        {(profile.photos.large) && <span>"yes pic"</span>}
        {(profile.photos.large === null) && <span>"no pic"</span>}
        <div>{profile.aboutMe}</div>
        <div>{profile.fullName}</div>
        <div>{profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
}
export default ProfileInfo;
