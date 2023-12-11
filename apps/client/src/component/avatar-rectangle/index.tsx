function AvatarRectangle({ avatar }: { avatar?: string | null }) {
  return (
    <img
      src={avatar ? avatar : '/images/default-avatar.png'}
      alt="avatar"
      className="h-24 w-24 border-base-light 
                border-3 rounded-md"
    />
  );
}

export default AvatarRectangle;
