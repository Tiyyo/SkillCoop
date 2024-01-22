import BenefitCard from './benefit-card';
import { useTranslation } from 'react-i18next';

function Benefits() {
  const { t } = useTranslation();
  return (
    <section className="bg-primary-gradient mx-auto">
      <p
        className="flex justify-center items-center text-sm text-primary-100 
          font-semibold tracking-wider"
      >
        <img src="/images/before-title.svg" alt="prefix icon title" />
        <span>{t('headTitleBenefits')}</span>
      </p>
      <h2
        className="text-primary-1100 font-bold 
        text-center text-3xl py-3 tracking-tighter"
      >
        {t('ourFeatures')}
      </h2>
      <p className="text-center px-6 text-primary-1100">
        {t('subtitleBenefits')}
      </p>
      <div
        className="flex flex-col sm:flex-row flex-wrap gap-x-24
          items-center justify-center mx-auto max-w-7xl px-12 py-14
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
