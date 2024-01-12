import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Page404() {
  const { t } = useTranslation('toast');
  return (
    <section className="flex items-center p-16">
      <div
        className="container flex flex-col items-center
           justify-center px-5 mx-auto my-8"
      >
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">{t('error')}</span>
            <span className="text-primary-1000">4</span>
            <span className="text-primary-500">0</span>
            <span className="text-primary-1000">4</span>
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-primary-1100">
            {t('couldNotFindPage')}
          </p>
          <p className="mt-4 mb-8 Animation">{t('youCanFindPlentyOfThings')}</p>
          <Link
            className="px-8 py-3 font-semibold cursor-pointer text-primary-900"
            to="/"
          >
            {t('backToHomepage')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Page404;
