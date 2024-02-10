import i18next from './config/i18n';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Login from './features/auth/login/login';
import Protected from './components/redirection/protected-routes';
import RedirectToHome from './components/redirection/redirect-to-home';
import TermsAndService from './features/terms-and-service/index';
import Register from './features/auth/register/register';
import { api } from './api/api.fn';
import VerifyEmail from './features/auth/verify-email';
import CreateEvent from './features/create-event/index';
import ResumeEvents from './features/event/resume-events/index';
import ConfirmedFriends from './features/friends/confirmed.friends';
import PendingFriends from './features/friends/pending.friends';
import AddFriends from './features/friends/add.friends';
import PastEvents from './features/event/events/past';
import IncomingEvents from './features/event/events/upcoming';
import MyEvents from './features/event/events/admin-event';
import EventPage from './features/event/event-page/index';
import ProfileInfos from './features/profile/index';
import UserResumeSkills from './features/skills/index';
import FriendProfile from './features/friend-profile-page/index';
/*eslint-disable*/
import ModalRouteRatingEvent from './features/event/event-page/modal-route-rating';
import ControlAccesEventPage from './components/redirection/control-access-event';
import Page404 from './components/404-page/index';
import ControlAccessOwnership from './components/redirection/control-access-ownership';
import { Toaster } from 'sonner';
import EndOfGameAwards from './features/event/awards';
import ForgotPassword from './features/auth/forgot-password';
import ResetPasswordMiddleware from './components/redirection/control-reset-password';
import NotificationContainer from './features/notification/index';
import InvitationFromEventPage from './features/event/event-page/invitation/index';
import InvitationFromCreateEventPage from './features/create-event/invitation';
import Settings from './features/settings/index';
import MenuSettings from './features/settings/menu';
import NotificationsSettings from './features/settings/notifications';
import LanguageSettings from './features/settings/language';
import ApparenceSettings from './features/settings/apparence';
import LoadingPage from './components/loading-page/index';
import VerifyEmailSuccess from './features/auth/email-success';
import OnBoarding from './features/onboarding';
import AccessControlGateway from './components/redirection/acces-gateway';
import OnBoardingCreateProfile from './features/onboarding/create-profile';
import OnBoardinAddImageProfile from './features/onboarding/add-image-profile';
import OnBoardingEvaluateSkill from './features/onboarding/evaluate-skill';
import NewConversation from './features/chat/add-conversation';
import DesktopChatHomePage from './features/chat/conversations/index.desktop';
import DesktopConversationPage from './features/chat/conversation/index.desktop';
import MobileChatHomePage from './features/chat/conversations/index.mobile';
import MobileConversationPage from './features/chat/conversation/index.mobile';
import { setDarkTheme, setLightTheme } from './utils/set-theme';
import AppLayout from './app-layout';
/*eslint-enable*/

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 0,
      // turn off caching for dev mode
      cacheTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <RedirectToHome>
        <Login />
      </RedirectToHome>
    ),
  },
  {
    path: '/register',
    element: (
      <RedirectToHome>
        <Register />
      </RedirectToHome>
    ),
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPasswordMiddleware /> },
  { path: '/verify-email/success', element: <VerifyEmailSuccess /> },
  {
    path: '/auth/google',
    loader: async ({ request }) => {
      const accessToken = request.url.split('=')[1];
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      return redirect('/');
    },
  },
  {
    path: '/terms-and-service',
    element: <TermsAndService />,
  },
  {
    path: '/onboarding/:profileId',
    element: <OnBoarding />,
    children: [
      { index: true, element: <OnBoardingCreateProfile /> },
      { path: 'add-image', element: <OnBoardinAddImageProfile /> },
      { path: 'evaluation', element: <OnBoardingEvaluateSkill /> },
    ],
  },
  {
    path: '',
    element: (
      <AccessControlGateway>
        <Protected>
          <AppLayout />
        </Protected>
      </AccessControlGateway>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<></>}>
            <ResumeEvents />
          </Suspense>
        ),
      },
      {
        path: '/new-event',
        element: <CreateEvent />,
      },
      {
        path: '/new-event/invitation',
        element: (
          <Suspense fallback="coucou">
            <InvitationFromCreateEventPage />
          </Suspense>
        ),
      },
      {
        path: '/event/:eventId/invitation',
        element: <InvitationFromEventPage />,
      },
      {
        path: '/events/incoming',
        element: <IncomingEvents />,
      },
      {
        path: '/events/past',
        element: <PastEvents />,
      },
      {
        path: '/my-event',
        element: <MyEvents />,
      },
      {
        path: '/event/:eventId/ownership',
        element: <ControlAccessOwnership />,
      },
      {
        path: '/event/:eventId',
        element: (
          <ControlAccesEventPage>
            <EventPage />
          </ControlAccesEventPage>
        ),
        children: [
          {
            path: 'evaluate/:profileId',
            element: (
              <Suspense fallback="cooucou">
                <ModalRouteRatingEvent />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/event/:eventId/votes',
        element: <EndOfGameAwards />,
      },
      { path: '*', element: <Page404 /> },
      {
        path: '/contact',
        children: [
          { index: true, element: <ConfirmedFriends /> },
          {
            path: 'pending-request',
            element: <PendingFriends />,
          },
          {
            path: 'add',
            element: <AddFriends />,
          },
          {
            path: 'profile/:id',
            element: <FriendProfile />,
          },
          { path: '*', element: <Page404 /> },
        ],
      },
      {
        path: '/user',
        children: [
          {
            path: 'profile',
            element: (
              <Suspense>
                <ProfileInfos />
              </Suspense>
            ),
          },
          {
            path: 'skills',
            element: (
              <Suspense fallback="cououou">
                <UserResumeSkills />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: <Settings />,
            children: [
              { index: true, element: <MenuSettings /> },
              { path: 'language', element: <LanguageSettings /> },
              { path: 'notifications', element: <NotificationsSettings /> },
              { path: 'apparence', element: <ApparenceSettings /> },
            ],
          },
          { path: '*', element: <Page404 /> },
        ],
      },
      { path: '/chat', element: <MobileChatHomePage /> },
      { path: `/chat/conversation/:id`, element: <MobileConversationPage /> },
      { path: 'chat/new-conversation/:userId', element: <NewConversation /> },
      {
        path: '/desktop/chat',
        element: <DesktopChatHomePage />,
        children: [
          {
            element: <DesktopConversationPage />,
            path: 'conversation/:id',
          },
          {
            path: 'new-conversation/:userId',
            element: <NewConversation />,
          },
          { path: '*', element: <Page404 /> },
        ],
      },
      {
        path: '/notification',
        element: (
          <Suspense fallback="coucou">
            <NotificationContainer />,
          </Suspense>
        ),
      },
    ],
  },
  { path: '*', element: <Page404 /> },
]);

i18next.init({
  fallbackLng: 'en',
  detection: {
    order: ['localStorage', 'navigator'],
    // other detection options
  },
  ns: [
    'landing-page',
    'auth',
    'event',
    'system',
    'title',
    'toast',
    'skill',
    'notification',
    'zod',
  ],
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

// Set the theme
const userPreferences = localStorage.getItem('_userPreferences')
  ? JSON.parse(localStorage.getItem('_userPreferences')!)
  : null;

userPreferences?.theme === 'light' ? setLightTheme() : setDarkTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} fallbackElement={<LoadingPage />} />
    </QueryClientProvider>
  </React.StrictMode>,
);
