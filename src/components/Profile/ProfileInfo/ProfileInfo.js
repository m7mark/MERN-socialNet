import Preloader from '../../common/Preloader/Preloader';
import p from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <div>< ProfileStatusWithHooks status={status} updateStatus={updateStatus} /></div>
      <div className={p.description}>
        <div><img src={profile.photos.large} alt="" ></img></div>

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
