import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Container from '../../../layouts/container';
import { useApp } from '../../../stores/app.store';
import TitleH1 from '../../../components/title-h1';

function HeaderHomePageChat() {
  const { t } = useTranslation('chat');
  const { userId } = useApp();

  return (
    <Container
      className="flex items-center justify-between lg:mt-4 
      lg:h-[70px] lg:rounded-none lg:rounded-t-lg lg:border-b 
      lg:border-b-grey-light"
    >
      <TitleH1
        title={t('conversations')}
        legend={t('retrieveAllConversations')}
      />
      <Link
        to={`new-conversation/${userId}`}
        className={`flex h-7 w-7 items-center justify-center self-center
              rounded-full bg-primary-100 text-xs
              font-medium text-white duration-300
             hover:bg-primary-600 hover:text-dark sm:rounded-3xl lg:h-11
              lg:w-fit lg:px-5 lg:py-4 lg:text-sm`}
      >
        <Plus />
        <p className="hidden text-center text-xs lg:block">
          {t('addNewDiscussion')}
        </p>
      </Link>
    </Container>
  );
}

export default HeaderHomePageChat;
