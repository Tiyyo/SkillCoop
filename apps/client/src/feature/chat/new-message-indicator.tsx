function NewMessageIndicator({
  lastSeen,
  lastUpdate,
}: {
  lastSeen: string;
  lastUpdate: string;
}) {
  const lastSeenDate = new Date(lastSeen);
  const lastUpdateDate = new Date(lastUpdate);

  const islLastSeenDate = lastSeenDate.getTime() < lastUpdateDate.getTime();
  const isNew = lastSeen === null || lastUpdate === null;

  return (
    <>
      {(islLastSeenDate || isNew) && (
        <div className="h-2 w-2 bg-primary-100 rounded-full"> </div>
      )}
    </>
  );
}

export default NewMessageIndicator;
