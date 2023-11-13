import defaultAvatar from '../../../public/images/default-avatar.png';

function Avatar({ avatar }: { avatar?: string }) {
  return (
    <img
      src={avatar ?? defaultAvatar}
      alt="avatar"
      className="w-10 h-10 rounded-full"
    />
  );
}

export default Avatar;
