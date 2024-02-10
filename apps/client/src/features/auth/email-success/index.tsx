import Page from '../../../layouts/page';
import animatedCheck from '../../../assets/svg/animated-check.svg';
import './animation.css';
import Center from '../../../layouts/center';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function VerifyEmailSuccess() {
  const { t } = useTranslation('auth');
  return (
    <Page>
      <Center>
        <h1 className="text-lg font-semibold text-primary-1100">
          {t('emailAuthSuccess')}
        </h1>
        <div className="checkbox-wrapper-12 my-8">
          <img src={animatedCheck} alt="check" />
          <div className="cbx">
            <svg fill="none" viewBox="0 0 15 14" height="48" width="50">
              <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
          </div>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo-12">
                <feGaussianBlur
                  result="blur"
                  stdDeviation="4"
                  in="SourceGraphic"
                ></feGaussianBlur>
                <feColorMatrix
                  result="goo-12"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                  mode="matrix"
                  in="blur"
                ></feColorMatrix>
                <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
        <Link to="/login" />
        <p className="text-md text-primary-1100">
          {t('youCanNowLoginByClicking')}{' '}
          <Link to="/login" className="font-semibold text-primary-900">
            {t('here')}
          </Link>
          .
        </p>
      </Center>
    </Page>
  );
}

export default VerifyEmailSuccess;
