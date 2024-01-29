import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32">
      <h1>
        <p
          className="my-1.5 bg-title bg-clip-text 
              text-5xl/[1.07] font-bold tracking-tight text-transparent"
        >
          {t('play')}.
        </p>
        <p className="pl-4 text-5xl/[1.07] font-bold tracking-tight">
          <span className="text-primary-1100">{t('not')}</span>
          <span className="bg-title bg-clip-text text-transparent">
            {' '}
            {t('plan')}.
          </span>
        </p>
      </h1>
      <h2
        className="bg-subtitle bg-clip-text py-1.5 text-2xl 
              font-semibold  tracking-tighter text-transparent"
      >
        {t('subtitleLandingPage')}
      </h2>
      <p
        className="mx-auto mt-6 max-w-3xl text-center  font-medium 
        text-grey-sub-text"
      >
        {t('descriptionHeroSection')}
      </p>
      <div
        className="border-opacity-10bg-primary-20 mx-auto my-6 flex w-fit
        items-center justify-between rounded-full border
        border-primary-400 bg-opacity-20 px-2 py-1.5"
      >
        <Link
          to="/register"
          className="rounded-full bg-primary-700 px-2 
                py-1 text-sm text-base-light hover:animate-pulse"
        >
          {t('start')}
        </Link>
        <p className="px-2.5 text-sm text-grey-sub-text">
          {t('organizeFristEvent')}
        </p>
      </div>
      <div
        className="mb-8 flex flex-col items-center 
            justify-center gap-y-1 text-sm text-grey-sub-text"
      >
        <p>{t('learnMore')}</p>
        <ArrowDown size={16} />
      </div>
      <img
        src="/images/upcoming-page.png"
        alt="incoming page event demo"
        className="mx-auto animate-fade-up opacity-0"
      />
    </div>
  );
}

export default HeroSection;
