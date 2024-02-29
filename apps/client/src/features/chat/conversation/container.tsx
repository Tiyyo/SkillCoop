import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import Container from '../../../shared/layouts/container';
/*eslint-disable */
import ConversationCardImage from '../../../shared/components/conversation-image';
import ConversationCardTitle from '../../../shared/components/conversation-title';
/*eslint-enable */
import { Info } from 'lucide-react';
import ConversationMessages from './message';
import ConversationInfos from './infos';
import { Conversation, HistoricMessages, Profile } from '@skillcoop/types/src';

import ReturnArrowBtn from '../../../shared/components/return-arrow-btn';
import useConversation from '../hooks/useConversation';

type ConversationProps = {
  conversation: Conversation | null | undefined;
  setShowConvInfos: Dispatch<SetStateAction<boolean>>;
  showConvInfos: boolean;
  historicMessages: HistoricMessages;
  userId: string | null;
  userProfile: Profile | null;
};

function ConversationContainer({
  conversation,
  setShowConvInfos,
  showConvInfos,
  historicMessages,
  userId,
  userProfile,
}: ConversationProps) {
  useConversation({ conversation, userId });
  const navigate = useNavigate();
  const handleClickReturn = (condition: boolean) => {
    return condition ? setShowConvInfos(!showConvInfos) : navigate('/chat');
  };

  return (
    <Container
      className="flex h-body flex-grow flex-col justify-between 
         rounded-none p-0 lg:h-[calc(100vh-214px)] lg:rounded-none"
    >
      {conversation && (
        <header
          className="flex items-center justify-between gap-x-4 border-b
           border-b-grey-light px-4 py-2 lg:h-[70px]"
        >
          <div className="lg:hidden">
            <ReturnArrowBtn
              onClick={handleClickReturn}
              condition={showConvInfos}
            />
          </div>
          <ConversationCardImage
            participantsList={conversation.participants_list}
            typeConversation={conversation.type_name}
            currentUserId={userId}
            size={38}
          />
          <div className="flex-grow">
            <ConversationCardTitle
              currentUserId={userId}
              title={conversation.title}
              participantsList={conversation.participants_list}
            />
          </div>
          <Info
            className="cursor-pointer text-primary-100 lg:hidden"
            size={20}
            onClick={() => setShowConvInfos(!showConvInfos)}
          />
        </header>
      )}
      <div
        className="relative flex flex-grow 
          flex-col justify-end overflow-y-auto"
      >
        {showConvInfos && conversation && (
          <ConversationInfos
            conversation={conversation}
            currentUserId={userId}
          />
        )}
        <ConversationMessages
          historicMessages={historicMessages}
          userId={userId}
          userProfile={userProfile}
          conversation={conversation}
        />
      </div>
    </Container>
  );
}

export default ConversationContainer;
