import GroupDateMessages from './messages.by-date';
import { MyForm } from './send-form';
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
        <div className="flex flex-col justify-between lg:h-[77vh]">
          <main
            className="no-scrollbar flex h-[calc(100vh-140px)] flex-grow 
            flex-col-reverse overflow-y-auto px-2.5 py-2 
            lg:h-[calc(77vh-190px)]"
          >
            <div className="flex flex-col pb-10 pt-32">
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
          <footer className="border-t border-b-grey-light py-4">
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
