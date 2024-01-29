import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import Container from '../../../../layouts/container';
import ConversationCardImage from '../image-conversation';
import ConversationCardTitle from '../title-conversation';
import { ArrowLeft, Info } from 'lucide-react';
import ConversationMessages from './messages.container';
import ConversationInfos from './infos';
import { Conversation, HistoricMessages, Profile } from '@skillcoop/types/src';

type ConversationProps = {
  conversation: Conversation | null | undefined;
  setShowConvInfos: Dispatch<SetStateAction<boolean>>;
  showConvInfos: boolean;
  historicMessages: HistoricMessages;
  userId: number | null;
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
  const navigate = useNavigate();
  return (
    <Container
      className="flex h-[calc(100vh-5rem)] flex-grow flex-col 
       justify-between p-0 lg:h-[77vh]"
    >
      {conversation && (
        <header
          className="flex items-center justify-between gap-x-4 border-b
           border-b-grey-light px-4 py-2 lg:h-[70px]"
        >
          <div
            className="flex aspect-square cursor-pointer items-center 
              justify-center rounded-full border border-opacity-10 
              p-1.5 text-primary-700 shadow lg:hidden"
            onClick={() =>
              showConvInfos
                ? setShowConvInfos(!showConvInfos)
                : navigate('/chat')
            }
          >
            <ArrowLeft size={18} />
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
        className="relative flex h-[calc(100vh-5rem)] flex-grow 
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
