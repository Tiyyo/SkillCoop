import { Link } from 'react-router-dom';
import { useGetConversationsList } from '../../hooks/useConversations';
import Container from '../../layout/container';
import { useApp } from '../../store/app.store';
import Tabs from './tabs';
import { useState } from 'react';
import TitleH1 from '../../component/title-h1';
import { Plus } from 'lucide-react';

function Conversations() {
  const { userId } = useApp();
  const [currentConversationFilter, setCurrentConversationFilter] = useState<
    'all' | 'event' | 'group' | 'personal'
  >('all');
  const { data: conversations } = useGetConversationsList({ userId: userId });

  return (
    <>
      <Container className="lg:mt-4 flex items-center justify-between">
        <TitleH1
          title="Conversations"
          legend="retrieve all your conversations"
        />
        <Link
          to="invitation"
          className={`flex shadow-md items-center gap-2 py-2.5 text-xs 
          lg:text-smtext-base-light bg-primary-800 px-2.5 sm:px-6 
          rounded-full font-semibold cursor-pointer hover:text-dark
         hover:bg-primary-500 duration-300`}
        >
          <Plus />
        </Link>
      </Container>
      <Container className="lg:mt-4 flex-grow">
        <Tabs
          getClickValue={setCurrentConversationFilter}
          currentFilter={currentConversationFilter}
        />
        <div className="flex flex-col">
          {conversations &&
            conversations.length > 0 &&
            conversations
              .filter((conversation) => conversation.last_message)
              .map((conversation) => (
                <Link
                  className="flex py-4"
                  to={`conversation/${conversation.conversation_id}`}
                >
                  <div
                    className="flex rounded-full aspect-square w-14 
                    flex-shrink-0 border-2 border-primary-800 text-center 
                    text-xs bg-slate-200"
                  ></div>
                  <div
                    className="flex flex-grow flex-col-reverse 
                    justify-between py-2 px-3"
                  >
                    <p className="text-xs text-light text-ellipsis">
                      {conversation.last_message.content} &#x2022;{' '}
                      <span>
                        {new Date(
                          conversation.last_message.created_at,
                        ).toLocaleString('us-US', { weekday: 'short' })}
                      </span>
                    </p>
                    <h3 className="text-sm font-medium">
                      {conversation.title}
                    </h3>
                  </div>
                </Link>
              ))}
        </div>
      </Container>
    </>
  );
}

export default Conversations;
