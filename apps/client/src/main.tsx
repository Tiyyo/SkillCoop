import i18next from './i18/i18n';
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
import Login from './feature/auth/login';
import Protected from './component/redirection/protected-routes';
import RedirectToHome from './component/redirection/redirect-to-home';
import TermsAndService from './feature/terms-and-service/index';
import Register from './feature/auth/register';
import { api } from './api/api.fn';
import VerifyEmail from './feature/auth/verify-email';
import HomePageEvent from './feature/event/index';
import CreateEvent from './feature/event/create-event/index';
import ResumeEvents from './feature/event/resume-events/index';
import ConfirmedFriends from './feature/friends/confirmed.friends';
import PendingFriends from './feature/friends/pending.friends';
import AddFriends from './feature/friends/add.friends';
import PastEvents from './feature/event/events/past';
import IncomingEvents from './feature/event/events/upcoming';
import MyEvents from './feature/event/events/admin-event';
import EventPage from './feature/event/event-page/index';
import ProfileInfos from './feature/profile/index';
import UserResumeSkills from './feature/skills/index';
import FriendProfile from './feature/friend-profile-page/index';
/*eslint-disable*/
import ModalRouteRatingEvent from './feature/event/event-page/modal-route-rating';
import ControlAccesEventPage from './component/redirection/control-access-event';
import Page404 from './component/404-page/index';
import ControlAccessOwnership from './component/redirection/control-access-ownership';
import { Toaster } from 'sonner';
import EndOfGameAwards from './feature/event/awards';
import ForgotPassword from './feature/auth/forgot-password';
import ResetPasswordMiddleware from './component/redirection/control-reset-password';
import NotificationContainer from './feature/notification/index';
import InvitationFromEventPage from './feature/event/event-page/invitation/index';
import InvitationFromCreateEventPage from './feature/event/create-event/invitation';
import Settings from './feature/settings/index';
import MenuSettings from './feature/settings/menu';
import NotificationsSettings from './feature/settings/notifications';
import LanguageSettings from './feature/settings/language';
import ApparenceSettings from './feature/settings/apparence';
import LoadingPage from './component/loading-page/index';
/*eslint-enable*/

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // retry: 1,
      // staleTime: 0,
      // turn off caching for dev mode
      // cacheTime: 0,
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
    path: '/',
    element: (
      <Protected>
        <HomePageEvent />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <ResumeEvents />,
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
            element: <ProfileInfos />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} fallbackElement={<LoadingPage />} />
    </QueryClientProvider>
  </React.StrictMode>,
);
