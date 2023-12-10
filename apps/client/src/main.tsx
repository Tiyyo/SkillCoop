import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Login from './feature/auth/login.tsx';
import Protected from './component/redirection/protected-routes.tsx';
import RedirectToHome from './component/redirection/redirect-to-home.tsx';
import TermsAndService from './feature/terms-and-service/index';
import Register from './feature/auth/register.tsx';
import { api } from './api/api.fn.ts';
import VerifyEmail from './feature/auth/verify-email.tsx';
import HomePageEvent from './feature/event/index.tsx';
import CreateEvent from './feature/event/create-event/index.tsx';
import ResumeEvents from './feature/event/resume-events/index.tsx';
import InvitationEvent from './feature/event/invitation-page/index.tsx';
import HomePageFriendslist from './feature/friends/index.tsx';
import ConfirmedFriends from './feature/friends/confirmed.friends.tsx';
import PendingFriends from './feature/friends/pending.friends.tsx';
import AddFriends from './feature/friends/add.friends.tsx';
import PastEvents from './feature/event/events/past.tsx';
import IncomingEvents from './feature/event/events/incoming.tsx';
import MyEvents from './feature/event/events/admin-event.tsx';
import EventPage from './feature/event/event-page/index.tsx';
import ProfileInfos from './feature/profile/infos/index.tsx';
import HomePageUser from './feature/profile/index.tsx';
import UserResumeSkills from './feature/profile/skills/index.tsx';
import FriendProfile from './feature/friend-profile-page/index.tsx';
import ModalRouteRatingEvent from './feature/event/event-page/modal-route-rating.tsx';
import ControlAccesEventPage from './component/redirection/control-access-event.tsx';
import Page404 from './component/404-page/index.tsx';
import ControlAccessOwnership from './component/redirection/control-access-ownership.tsx';
import { Toaster } from 'sonner';
import EndOfGameAwards from './feature/event/awards.tsx';
import ForgotPassword from './feature/auth/forgot-password.tsx';
import ResetPasswordMiddleware from './component/redirection/control-reset-password.tsx';
import NotificationContainer from './feature/notification/index.tsx';
import { SERVER_URL } from './utils/server.ts';

export const sseEvent = new EventSource(
  `${SERVER_URL}/api/subscription_pathway`,
  {
    withCredentials: true,
  },
);

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
        element: <InvitationEvent />,
      },
      {
        path: '/event/:eventId/invitation',
        element: <InvitationEvent />,
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
            element: <ModalRouteRatingEvent />,
          },
        ],
      },
      {
        path: '/event/:eventId/votes',
        element: <EndOfGameAwards />,
      },
      { path: '*', element: <Page404 /> },
    ],
  },
  {
    path: '/contact',
    element: (
      <Protected>
        <HomePageFriendslist />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <ConfirmedFriends />,
      },
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
    element: (
      <Protected>
        <HomePageUser />
      </Protected>
    ),
    children: [
      {
        path: 'profile',
        element: <ProfileInfos />,
      },
      {
        path: 'skills',
        element: <UserResumeSkills />,
      },
      { path: '*', element: <Page404 /> },
    ],
  },
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
    path: '/notification',
    element: (
      <Protected>
        <NotificationContainer />
      </Protected>
    ),
  },
  { path: '*', element: <Page404 /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
