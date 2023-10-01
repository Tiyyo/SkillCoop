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
import Login from './feature/auth/Login.tsx';
import Protected from './component/redirection/Protected.tsx';
import RedirectToHome from './component/redirection/RedirectToHome.tsx';
import TermsAndService from './feature/terms-and-service/index';
import Register from './feature/auth/Register.tsx';
import { authApi } from './api/authApi.ts';
import VerifyEmail from './feature/auth/VerifyEmail.tsx';
import HomePageEvent from './feature/event/index.tsx';
import CreateEvent from './feature/event/CreateEvent.tsx';
import ResumeEvents from './feature/event/ResumeEvents.tsx';
import InvitationEvent from './feature/event/InvitationEvent.tsx';
import HomePageFriendslist from './feature/friends/index.tsx';
import ConfirmedFriends from './feature/friends/ConfirmedFriends.tsx';
import PendingFriends from './feature/friends/PendingFriends.tsx';
import AddFriends from './feature/friends/AddFriends.tsx';
import PastEvents from './feature/event/PastEvents.tsx';
import IncomingEvents from './feature/event/IncomingEvents.tsx';
import MyEvents from './feature/event/MyEvents.tsx';
import EventPage from './feature/event/EventPage.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
      // turn off caching for dev mode
      cacheTime: 0,
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
        path: '/event/:id',
        element: <EventPage />,
      },
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
  {
    path: '/auth/google',
    loader: async ({ request }) => {
      const accessToken = request.url.split('=')[1];
      authApi.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
      return redirect('/');
    },
  },
  {
    path: '/terms-and-service',
    element: <TermsAndService />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
