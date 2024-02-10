import ImageWithFallback from '../../../shared/components/image';
/*eslint-disable*/
import ImageWithUsernamefallback from '../../../shared/components/image-fallback-username';
import GroupChatImageWithUsernameFallback from '../pair-avatar';
/*eslint-enable*/

type ConversationCardImageProps = {
  typeConversation: 'oneToOne' | 'group' | 'event';
  participantsList: {
    user_id: number;
    username: string;
    avatar: string | null;
  }[];
  currentUserId: number | null;
  size?: number;
};
function ConversationCardImage({
  participantsList,
  typeConversation,
  currentUserId,
  size,
}: ConversationCardImageProps) {
  const participants = participantsList.filter(
    (p) => p.user_id !== Number(currentUserId),
  );
  /* oneToOne: 1 user*/
  if (typeConversation === 'oneToOne') {
    return (
      <ImageWithUsernamefallback
        avatar={participants[0].avatar}
        username={participants[0].username}
        size={size}
      />
    );
  }

  /*group: TODO: refactor */
  if (typeConversation === 'group' || typeConversation === 'event') {
    if (participants.length === 0) {
      return <ImageWithFallback url={null} alt="default image" size={size} />;
    }
    if (participants.length === 1) {
      return (
        <ImageWithUsernamefallback
          avatar={participants[0].avatar}
          username={participants[0].username}
          size={size}
        />
      );
    }
    if (participants.length > 1) {
      const participantsWithAvatar = participants.filter((p) => p.avatar);
      if (participantsWithAvatar.length === 0) {
        return <ImageWithFallback url={null} alt="default image" size={size} />;
      }
      if (participantsWithAvatar.length === 1) {
        return (
          <ImageWithUsernamefallback
            avatar={participantsWithAvatar[0].avatar}
            username={participantsWithAvatar[0].username}
            size={size}
          />
        );
      }
      if (participantsWithAvatar.length > 1) {
        return (
          <GroupChatImageWithUsernameFallback
            avatarUerOne={participantsWithAvatar[0].avatar}
            avatarUserTwo={participantsWithAvatar[1].avatar}
            usernameOne={participantsWithAvatar[0].username}
            usernameTwo={participantsWithAvatar[1].username}
            size={size}
          />
        );
      }
    }
  }
}
export default ConversationCardImage;
