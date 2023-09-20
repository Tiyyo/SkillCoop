
function Avatar({userAvatar} : {userAvatar?: string}) {
  return (
    <div className="rounded-full overflow-hidden w-10 h-10 shadow-md border-2">
      <img
        src={userAvatar ? userAvatar : '/images/default-avatar.png'}
        className="rounded-full"
        alt="user avatar"
      />
    </div>
  );
}

export default Avatar;
