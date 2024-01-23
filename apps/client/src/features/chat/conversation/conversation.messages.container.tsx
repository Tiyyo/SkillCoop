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
        <>
          <main className="overflow-hidden overflow-y-auto py-2">
            <div
              className="flex flex-col gap-y-1 
          overflow-y-scroll px-2.5"
            >
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
          <footer
            className="border-t border-b-grey-light 
        py-4"
          >
            <MyForm
              conversationId={conversation?.conversation_id}
              userId={userId}
              username={userProfile?.username}
              avatar={userProfile?.avatar_url}
            />
          </footer>
        </>
      )}
    </>
  );
}

export default ConversationMessages;
