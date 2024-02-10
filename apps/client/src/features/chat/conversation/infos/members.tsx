import { ConversationParticipant, TypeConversation } from '@skillcoop/types';
import InfosMembersNav from './members.nav';
import InfosMembersTrigger from './members.trigger';
import InfosMembersFriendslist from './members.friendslist';
import useInfosMembers from '../../hooks/useInfosMembers';
import InfosMembersList from './members.list';

type ConversationInfosMembersProps = {
  typeConversation: TypeConversation;
  currentUserId: number | null;
  participantsList: ConversationParticipant[];
  conversationId: number;
};

function ConversationInfosMembers({
  typeConversation,
  currentUserId,
  participantsList,
  conversationId,
}: ConversationInfosMembersProps) {
  if (typeConversation === 'oneToOne' || !currentUserId) return null;
  const {
    containerRef,
    shouldExpand,
    setShouldExpand,
    handleClickNavigation,
    isAdmin,
    setSearchValue,
    friendsNotInGroup,
    addUsersToGroup,
    removeUserFromGroup,
  } = useInfosMembers({
    conversationId,
    currentUserId,
    participantsList,
  });

  return (
    <>
      <div
        className="w-full overflow-x-auto 
       border-b border-b-grey-light border-opacity-20 py-4"
      >
        <InfosMembersTrigger toggle={setShouldExpand} value={shouldExpand} />
        <ul
          ref={containerRef}
          className="no-scrollbar grid w-full grid-flow-col 
          justify-start gap-x-10 overflow-x-auto scroll-smooth px-6 py-3"
        >
          <InfosMembersList
            participants={participantsList}
            remove={removeUserFromGroup}
            conversationId={conversationId}
            isAdmin={isAdmin}
            typeConversation={typeConversation}
            currentUserId={currentUserId}
          />
        </ul>
        <div className="hidden justify-between lg:flex">
          <InfosMembersNav handleClick={handleClickNavigation} />
        </div>
      </div>
      {shouldExpand && (
        <InfosMembersFriendslist
          setSearchValue={setSearchValue}
          filteredFriends={friendsNotInGroup}
          addUsersToGroup={addUsersToGroup}
          conversationId={conversationId}
        />
      )}
    </>
  );
}

export default ConversationInfosMembers;
