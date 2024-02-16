import i18next from './config/i18n';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { api } from './api/api.fn';
import { Toaster } from 'sonner';
import { setDarkTheme, setLightTheme } from './shared/utils/set-theme';
/*eslint-disable*/
const Login = lazy(() => import('./features/auth/login/login'));
const Protected = lazy(
  () => import('./shared/components/redirection/protected-routes'),
);
const RedirectToHome = lazy(
  () => import('./shared/components/redirection/redirect-to-home'),
);
const TermsAndService = lazy(
  () => import('./features/terms-and-service/index'),
);
const Register = lazy(() => import('./features/auth/register/register'));
const VerifyEmail = lazy(() => import('./features/auth/verify-email'));
const CreateEvent = lazy(() => import('./features/create-event/index'));
const ResumeEvents = lazy(() => import('./features/event-list/home'));
const ConfirmedFriends = lazy(() => import('./features/friends/confirmed'));
const PendingFriends = lazy(() => import('./features/friends/pending'));
const AddFriends = lazy(() => import('./features/friends/add-new'));
const PastEvents = lazy(() => import('./features/event-list/past'));
const IncomingEvents = lazy(() => import('./features/event-list/upcoming'));
const MyEvents = lazy(() => import('./features/event-list/admin-event'));
const EventPage = lazy(() => import('./features/event-page/main'));
const ProfileInfos = lazy(() => import('./features/profile/index'));
const UserResumeSkills = lazy(() => import('./features/skills/index'));
const FriendProfile = lazy(
  () => import('./features/friend-profile-page/index'),
);
const ModalRouteRatingEvent = lazy(
  () => import('./features/event-page/main/modal-route-rating'),
);
const ControlAccesEventPage = lazy(
  () => import('./shared/components/redirection/control-access-event'),
);
const Page404 = lazy(() => import('./shared/components/404-page/index'));
const ControlAccessOwnership = lazy(
  () => import('./shared/components/redirection/control-access-ownership'),
);
const EndOfGameAwards = lazy(() => import('./features/event-page/awards'));
const ForgotPassword = lazy(() => import('./features/auth/forgot-password'));
const ResetPasswordMiddleware = lazy(
  () => import('./shared/components/redirection/control-reset-password'),
);
const NotificationContainer = lazy(
  () => import('./features/notification/index'),
);
const InvitationFromEventPage = lazy(
  () => import('./features/event-page/invitation/index'),
);
const InvitationFromCreateEventPage = lazy(
  () => import('./features/create-event/invitation'),
);
const Settings = lazy(() => import('./features/settings/index'));
const MenuSettings = lazy(() => import('./features/settings/menu'));
const NotificationsSettings = lazy(
  () => import('./features/settings/notification'),
);
const LanguageSettings = lazy(() => import('./features/settings/language'));
const ApparenceSettings = lazy(() => import('./features/settings/apparence'));
const LoadingPage = lazy(
  () => import('./shared/components/loading-page/index'),
);
const VerifyEmailSuccess = lazy(() => import('./features/auth/email-success'));
const OnBoarding = lazy(() => import('./features/onboarding'));

import AccessControlGateway from './shared/components/redirection/acces-gateway';
// const AccessControlGateway = lazy(
//   () => import('./shared/components/redirection/acces-gateway'),
// );
const OnBoardingCreateProfile = lazy(
  () => import('./features/onboarding/create-profile'),
);
const OnBoardinAddImageProfile = lazy(
  () => import('./features/onboarding/add-image-profile'),
);
const OnBoardingEvaluateSkill = lazy(
  () => import('./features/onboarding/evaluate-skill'),
);
const DesktopChatHomePage = lazy(
  () => import('./features/chat/conversations/index.desktop'),
);
const DesktopConversationPage = lazy(
  () => import('./features/chat/conversation/index.desktop'),
);
const MobileChatHomePage = lazy(
  () => import('./features/chat/conversations/index.mobile'),
);
const MobileConversationPage = lazy(
  () => import('./features/chat/conversation/index.mobile'),
);
const AppLayout = lazy(() => import('./app-layout'));
const GeoCodingTest = lazy(
  () => import('./features/create-event/create-playground'),
);
const NewConversation = lazy(
  () => import('./features/chat/add-conversation/index'),
);
import SkillcoopLoadingPage from './shared/components/skillcoop-loading-page';
import FindEvents from './features/find-event';

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
  { path: '/test', element: <GeoCodingTest /> },
  {
    path: '/login',
    element: (
      <Suspense fallback={<SkillcoopLoadingPage />}>
        <RedirectToHome>
          <Login />
        </RedirectToHome>
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<SkillcoopLoadingPage />}>
        <RedirectToHome>
          <Register />
        </RedirectToHome>
      </Suspense>
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
          <Suspense fallback={<SkillcoopLoadingPage />}>
            <AppLayout />
          </Suspense>
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
            <NotificationContainer />
          </Suspense>
        ),
      },
      { path: 'find-event', element: <FindEvents /> },
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
