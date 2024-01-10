import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className="py-24 sm:py-32 mx-auto max-w-7xl px-6 text-center">
      <h1>
        <p
          className="bg-clip-text bg-title my-1.5 
              text-5xl/[1.07] text-transparent font-bold tracking-tight"
        >
          {t('play')}.
        </p>
        <p className="pl-4 text-5xl/[1.07] font-bold tracking-tight">
          <span className="text-primary-1100">{t('not')}</span>
          <span className="bg-clip-text bg-title text-transparent">
            {' '}
            {t('plan')}.
          </span>
        </p>
      </h1>
      <h2
        className="bg-clip-text bg-subtitle text-transparent text-2xl 
              font-semibold  py-1.5 tracking-tighter"
      >
        {t('subtitleLandingPage')}
      </h2>
      <p
        className="mx-auto max-w-3xl text-center font-medium  mt-6 
        text-grey-sub-text"
      >
        {t('descriptionHeroSection')}
      </p>
      <div
        className="w-fit mx-auto py-1.5 bg-primary-20 bg-opacity-20
              rounded-full flex justify-between items-center px-2 
              my-6 border border-opacity-10 border-primary-400"
      >
        <Link
          to="/register"
          className="bg-primary-700 px-2 py-1 
                rounded-full text-base-light text-sm hover:animate-pulse"
        >
          {t('start')}
        </Link>
        <p className="text-sm px-2.5 text-grey-sub-text">
          {t('organizeFristEvent')}
        </p>
      </div>
      <div
        className="flex flex-col justify-center items-center 
            text-grey-sub-text text-sm gap-y-1 mb-8"
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
