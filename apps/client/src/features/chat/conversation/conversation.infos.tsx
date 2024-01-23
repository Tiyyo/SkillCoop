import { Conversation } from '@skillcoop/types';
import ConversationCardImage from '../image-conversation';
import ConversationCardTitle from '../title-conversation';
import { Link } from 'react-router-dom';
import ConversationInfosLink from './conversation.infos.link';
import ConversationInfosMembers from './conversation.infos.members';
import ConversationInfosActions from './conversation.infos.actions';

type ConversationInfosProps = {
  conversation: Conversation;
  currentUserId: number | null;
};

function ConversationInfos({
  conversation,
  currentUserId,
}: ConversationInfosProps) {
  return (
    <div
      className="animate-expand-page-in absolute top-0 z-10 
      flex h-7 w-full flex-col items-center 
    justify-start bg-base-light px-4 py-8 opacity-0"
    >
      <div
        className="flex w-full flex-grow flex-col 
    items-center justify-start"
      >
        <div
          className="mx-auto flex aspect-square h-24 
        flex-shrink-0 items-center justify-center"
        >
          <ConversationCardImage
            participantsList={conversation.participants_list}
            typeConversation={conversation.type_name}
            currentUserId={currentUserId}
            size={96}
          />
        </div>
        <ConversationCardTitle
          title={conversation.title}
          currentUserId={currentUserId}
          participantsList={conversation.participants_list}
          classname="text-lg pt-4"
        />
        <ConversationInfosLink
          conversation={conversation}
          currentUserId={currentUserId}
        />
        <ConversationInfosMembers
          participantsList={conversation.participants_list}
          typeConversation={conversation.type_name}
          currentUserId={currentUserId}
          conversationId={conversation.conversation_id}
        />
      </div>
      <ConversationInfosActions
        typeConversation={conversation.type_name}
        currentUserId={currentUserId}
        participantsList={conversation.participants_list}
        conversationId={conversation.conversation_id}
      />
    </div>
  );
}

export default ConversationInfos;
