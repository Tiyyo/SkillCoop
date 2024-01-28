import GroupDateMessages from './conversation.messages.by-date';
import { MyForm } from './conversation.send-form';
import { Conversation, Profile, HistoricMessages } from '@skillcoop/types/src';

type ConversationMessagesProps = {
  historicMessages: HistoricMessages;
  userId: number | null;
  userProfile: Profile | null;
  conversation: Conversation | undefined | null;
};

function ConversationMessages({
  historicMessages,
  userId,
  userProfile,
  conversation,
}: ConversationMessagesProps) {
  return (
    <>
      {conversation && (
        <div className="flex flex-col lg:h-[77vh]">
          <main
            className="no-scrollbar h-[calc(100vh-140px)] 
             overflow-y-auto px-2.5 py-2 lg:h-[calc(77vh-190px)]"
          >
            <div className="flex flex-col justify-end">
              {historicMessages &&
                historicMessages.map((group) => (
                  <GroupDateMessages
                    key={group.date}
                    date={group.date}
                    authorGroups={group.author_groups}
                    currentUserId={userId}
                  />
                ))}
            </div>
          </main>
          <footer className="border-t border-b-grey-light py-4 lg:h-[120px]">
            <MyForm
              conversationId={conversation?.conversation_id}
              userId={userId}
              username={userProfile?.username}
              avatar={userProfile?.avatar_url}
            />
          </footer>
        </div>
      )}
    </>
  );
}

export default ConversationMessages;
