import Xtwitter from '../../assets/icon/Xtwitter';
import Facebook from '../../assets/icon/Facebook';
import Insta from '../../assets/icon/Insta';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-footer px-12 py-12 text-white lg:px-24 ">
      <ul className="flex flex-col gap-x-4 lg:flex-row">
        <li>{t('home')}</li>
        <li>{t('ourProduct')}</li>
        <li>{t('faq')}</li>
        <li>{t('termsAndConditions')}</li>
        <li>{t('privacyPolicy')}</li>
      </ul>
      <div className="flex w-full py-3 ">
        <div className="flex w-full flex-col">
          <div
            className=" w-full basis-1/2 border-b 
          border-b-grey-sub-text"
          ></div>
          <div></div>
        </div>
        <ul
          className="flex min-w-fit 
          max-w-[174px] basis-3/12 items-center
          justify-center gap-x-5 rounded-full bg-white px-5 py-2"
        >
          <li>
            <Xtwitter />
          </li>
          <li>
            <Facebook />
          </li>
          <li>
            <Insta />
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-12 md:flex-row">
        <div>
          <p>{t('location')}</p>
          <p className="text-grey-sub-text">Paris, FR</p>
        </div>
        <div>
          <p>{t('contactUs')}</p>
          <p className="text-grey-sub-text">contact@skillcoop.fr</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
