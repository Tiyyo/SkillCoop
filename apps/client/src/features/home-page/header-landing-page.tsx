import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeaderLandingPage() {
  const { t } = useTranslation();
  return (
    <header className="flex h-20 items-center justify-between px-4 py-5">
      <p className="text-sm font-semibold text-dark md:text-md lg:text-2xl">
        Skill<span className="text-primary-100">coop</span>
      </p>

      <div className="flex items-center gap-x-2 text-sm">
        <Link to="/login" className="text-grey-sub-text">
          {t('login')}
        </Link>
        <Link
          to="/register"
          className="rounded-full border  border-primary-100 
        bg-primary-200 px-4 py-2 font-semibold text-primary-100"
        >
          {t('joinUs')}
        </Link>
      </div>
    </header>
  );
}

export default HeaderLandingPage;
