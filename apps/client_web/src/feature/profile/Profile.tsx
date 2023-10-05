import { useApp } from '../../store/app.store';
import capitalize from '../../utils/capitalize';

function ProfileInfos() {
  const { userProfile } = useApp();
  return (
    <div>
      <div className="bg-slate-800 rounded-full h-20 aspect-square"></div>
      <div>
        <div>{capitalize(userProfile.username)}</div>
      </div>
    </div>
  );
}

export default ProfileInfos;
