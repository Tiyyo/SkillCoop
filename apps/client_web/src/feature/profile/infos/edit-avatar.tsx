function AvatarEdit({ avatar }: { avatar: string | null }) {
  return (
    <div className="border flex-shrink-0 border-primary-500 overflow-hidden rounded-full h-20 w-20">
      <img
        src={avatar ?? '/images/default-avatar.png'}
        alt="avatar"
        className="object-cover h-full w-full"
      />
    </div>
  );
}

export default AvatarEdit;
