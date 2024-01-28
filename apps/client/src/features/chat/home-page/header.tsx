import TitleH1 from '../../../components/title-h1';
import Container from '../../../layouts/container';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../stores/app.store';
import { Plus } from 'lucide-react';

function HeaderHomePageChat() {
  const { t } = useTranslation('chat');
  const { userId } = useApp();

  return (
    <Container
      className="flex items-center justify-between lg:mt-4 
      lg:h-[70px]"
    >
      <TitleH1
        title={t('conversations')}
        legend={t('retrieveAllConversations')}
      />
      <Link
        to={`new-conversation/${userId}`}
        className={`flex aspect-square cursor-pointer 
          items-center rounded-full bg-primary-800 
          p-0.5 text-xs font-semibold 
          text-base-light shadow-md duration-300
          hover:bg-primary-500 hover:text-dark sm:px-2 lg:text-sm`}
      >
        <Plus />
      </Link>
    </Container>
  );
}

export default HeaderHomePageChat;
