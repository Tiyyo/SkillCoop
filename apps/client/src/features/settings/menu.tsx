import Container from '../../shared/layouts/container';
import DeleteUserAccount from './delete-account';
import Logout from './logout';
import MenuSettingItem from './menu.item';
import {
  Bell,
  Flag,
  HelpCircle,
  MessagesSquare,
  PenLine,
  ShieldCheck,
  SunMoon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function MenuSettings() {
  const { t } = useTranslation('system');
  return (
    <div className="flex flex-grow flex-col justify-between">
      <Container className="lg:mt-4">
        <MenuSettingItem link="language" name={t('language')}>
          <Flag size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="notifications" name={t('notifications')}>
          <Bell size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="apparence" name={t('apparence')}>
          <SunMoon size={18} />
        </MenuSettingItem>
      </Container>
      <Container className="flex-grow lg:mt-4">
        <MenuSettingItem link="faq" name={t('faq')}>
          <HelpCircle size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="privacy-policy" name={t('privacyPolicy')}>
          <ShieldCheck size={18} />
        </MenuSettingItem>
        <MenuSettingItem
          link="terms-and-service"
          name={t('termsAndConditions')}
        >
          <PenLine size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="contact-us" name={t('contactUs')}>
          <MessagesSquare size={18} />
        </MenuSettingItem>
      </Container>
      <Container className="border-t border-t-grey-light shadow-none lg:mt-4">
        <Logout />
        <DeleteUserAccount />
      </Container>
    </div>
  );
}

export default MenuSettings;
