import { Link, Outlet } from 'react-router-dom';
import Plus from '../../assets/icon/Plus';
import TitleH1 from '../../component/title-h1';
import Container from '../../layout/container';
import Tabs from './tabs';
import { useState } from 'react';
import { useGetConversationsList } from '../../hooks/useConversations';
import { useApp } from '../../store/app.store';

function ChatHomePage() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default ChatHomePage;
