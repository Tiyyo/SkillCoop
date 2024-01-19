type ConversationCardTitleProps = {
  title: string | null;
  currentUserId: number;
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
    <h3 className="text-sm font-medium text-ellipsis line-clamp-1 my-0.5">
      {title ? title : participantsName}
    </h3>
  );
}

export default ConversationCardTitle;
