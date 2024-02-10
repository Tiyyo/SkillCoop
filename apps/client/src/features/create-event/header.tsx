import { Link } from 'react-router-dom';
import Plus from '../../assets/icon/Plus';
import TitleH2 from '../../components/title-h2';
import { useTranslation } from 'react-i18next';

function HeaderCreateEvent() {
  const { t } = useTranslation('event');
  return (
    <div className="flex items-center justify-between pr-4">
      <TitleH2
        title={t('title:createNewEvent')}
        legend={t('title:createNewEventLegend')}
      />
      <Link
        to="invitation"
        className={`flex h-7 w-7 items-center justify-center self-center
              rounded-full bg-primary-100 text-xs
              font-medium text-white duration-300
             hover:bg-primary-600 hover:text-dark sm:rounded-3xl lg:h-11
              lg:w-fit lg:px-5 lg:py-4 lg:text-sm`}
      >
        <p className="hidden lg:block">{t('inviteYourFriends')}</p>
        <Plus />
      </Link>
    </div>
  );
}

export default HeaderCreateEvent;
