type ConversationCardTitleProps = {
  title: string | null;
  currentUserId: number | null;
  participantsList: {
    user_id: number;
    username: string;
  }[];
};

function ConversationCardTitle({
  title,
  currentUserId,
  participantsList,
}: ConversationCardTitleProps) {
  const participantsName = participantsList
    .filter((p) => p.user_id !== currentUserId)
    .map((p) => p.username)
    .join(', ');

  return (
    <h3 className="my-0.5 line-clamp-1 text-ellipsis text-sm font-medium">
      {title ? title : participantsName}
    </h3>
  );
}

export default ConversationCardTitle;
