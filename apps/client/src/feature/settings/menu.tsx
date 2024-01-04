import Container from '../../layout/container';
import MenuSettingItem from './menu-item';
import {
  Bell,
  Flag,
  HelpCircle,
  LogOut,
  MessagesSquare,
  PenLine,
  ShieldCheck,
  SunMoon,
  Trash2,
} from 'lucide-react';

function MenuSettings() {
  return (
    <div className="flex flex-col flex-grow justify-between">
      <Container className="lg:mt-4">
        <MenuSettingItem link="language" name="language">
          <Flag size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="notifications" name="notifications">
          <Bell size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="apparence" name="apparence">
          <SunMoon size={18} />
        </MenuSettingItem>
      </Container>
      <Container className="flex-grow lg:mt-4">
        <MenuSettingItem link="faq" name="FAQ">
          <HelpCircle size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="privacy-policy" name="privacy policy">
          <ShieldCheck size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="terms-and-service" name="terms and service">
          <PenLine size={18} />
        </MenuSettingItem>
        <MenuSettingItem link="contact-us" name="contact us">
          <MessagesSquare size={18} />
        </MenuSettingItem>
      </Container>
      <Container className="lg:mt-4 bg-transparent shadow-none">
        <div
          className="flex items-center justify-center py-3.5
       hover:bg-primary-210 rounded-lg px-1.5"
        >
          <span className="px-2.5">
            <LogOut size={18} />
          </span>
          Logout
        </div>
        <div
          className="flex items-center justify-center py-3.5
        rounded-lg px-1.5 text-error"
        >
          <span className="px-2.5">
            <Trash2 size={18} />
          </span>
          Delete your account
        </div>
      </Container>
    </div>
  );
}

export default MenuSettings;
