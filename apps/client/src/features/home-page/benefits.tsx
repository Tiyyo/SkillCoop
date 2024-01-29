import BenefitCard from './benefit-card';
import { useTranslation } from 'react-i18next';

function Benefits() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto bg-primary-gradient">
      <p
        className="flex items-center justify-center text-sm font-semibold 
          tracking-wider text-primary-100"
      >
        <img src="/images/before-title.svg" alt="prefix icon title" />
        <span>{t('headTitleBenefits')}</span>
      </p>
      <h2
        className="py-3 text-center 
        text-3xl font-bold tracking-tighter text-primary-1100"
      >
        {t('ourFeatures')}
      </h2>
      <p className="px-6 text-center text-primary-1100">
        {t('subtitleBenefits')}
      </p>
      <div
        className="mx-auto flex max-w-7xl flex-col flex-wrap
          items-center justify-center gap-x-24 px-12 py-14 sm:flex-row
         "
      >
        <BenefitCard
          title={t('simplify')}
          description={t('simplifyDescription')}
        >
          <img
            src="/images/calendar-green.png"
            alt="feature 1"
            className="h-20 object-fill"
          />
        </BenefitCard>
        <BenefitCard
          title={t('thinkless')}
          description={t('thinklessDescription')}
        >
          <img
            src="/images/group-people-green.png"
            alt="feature 1"
            className="h-20 object-fill"
          />
        </BenefitCard>
        <BenefitCard title={t('connect')} description={t('connectDescription')}>
          <img
            src="/images/chat-bubbles-green.png"
            alt="feature 1"
            className="h-20 object-fill"
          />
        </BenefitCard>
      </div>
    </section>
  );
}

export default Benefits;
