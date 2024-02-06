import { Conversation } from '@skillcoop/types';
import ConversationCardImage from '../image-conversation';
import ConversationCardTitle from '../title-conversation';
import ConversationInfosLink from './infos.link';
import ConversationInfosMembers from './infos.members';
import ConversationInfosActions from './infos.actions';

type ConversationInfosProps = {
  conversation: Conversation;
  currentUserId: number | null;
};

const mobileViewStyle = `absolute top-0 z-10  h-7 w-full    
    justify-start  `;

const desktopViewStyle = `lg:w-4/12 lg:max-w-[260px] 
lg:flex-grow-0 lg:basis-4/12 lg:justify-between lg:static `;

function ConversationInfos({
  conversation,
  currentUserId,
}: ConversationInfosProps) {
  return (
    <div
      className={`flex animate-expand-page-in flex-col 
      items-center bg-base-light 
      px-4 py-8 opacity-0 lg:h-[25px]
      ${mobileViewStyle} ${desktopViewStyle}`}
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
            size={72}
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
