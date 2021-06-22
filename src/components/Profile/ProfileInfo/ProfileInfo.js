import Preloader from '../../common/Preloader/Preloader';
import p from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div>
        <img className={p.profileimg} src="https://sun9-49.userapi.com/c855320/v855320490/1808cd/9WwGYObad2A.jpg" alt=""/>
      </div>
      <div className={p.description}>
        <div><img src={props.profile.photos.large} alt="" ></img></div>
        <div>{props.profile.aboutMe}</div>
        <div>{props.profile.fullName}</div>
        <div>{props.profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
}
export default ProfileInfo;
