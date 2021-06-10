import p from './ProfileInfo.module.css'

const ProfileInfo = () => {
  return (
    <div>
      <div>
      <img className={p.profileimg} src="https://sun9-49.userapi.com/c855320/v855320490/1808cd/9WwGYObad2A.jpg" />
      </div>
      <div className={p.description}>Avatar + description</div>
    </div>
  );
}
export default ProfileInfo;
