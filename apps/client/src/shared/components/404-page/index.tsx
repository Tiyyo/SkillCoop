import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Page404() {
  const { t } = useTranslation('toast');
  return (
    <section className="flex items-center p-16">
      <div
        className="container mx-auto my-8 flex
           flex-col items-center justify-center px-5"
      >
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">{t('error')}</span>
            <span className="text-primary-1000">4</span>
            <span className="text-primary-500">0</span>
            <span className="text-primary-1000">4</span>
          </h2>
          <p className="text-2xl font-semibold text-primary-1100 md:text-3xl">
            {t('couldNotFindPage')}
          </p>
          <p className="Animation mb-8 mt-4">{t('youCanFindPlentyOfThings')}</p>
          <Link
            className="cursor-pointer px-8 py-3 font-semibold text-primary-900"
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
