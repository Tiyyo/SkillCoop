function NewMessageIndicator({
  lastSeen,
  lastUpdate,
  isWriteByCurrentUser,
}: {
  lastSeen: string | null;
  lastUpdate: string | null;
  isWriteByCurrentUser: boolean;
}) {
  const islLastSeenDate = () => {
    if (!lastSeen || !lastUpdate) return false;
    const lastSeenDate = new Date(lastSeen);
    const lastUpdateDate = new Date(lastUpdate);
    return (
      lastSeenDate.getTime() < lastUpdateDate.getTime() && !isWriteByCurrentUser
    );
  };

  const isNew = lastSeen === null && !isWriteByCurrentUser;

  return (
    <>
      {(islLastSeenDate() || isNew) && (
        <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary-100">
          {' '}
        </div>
      )}
    </>
  );
}

export default NewMessageIndicator;
