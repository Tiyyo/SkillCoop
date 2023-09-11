import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { StateContextProvider } from "./context/app.context.tsx";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Login from "./feature/auth/Login.tsx";
import Protected from "./component/redirection/Protected.tsx";
import RedirectToHome from "./component/redirection/RedirectToHome.tsx";
import Register from "./feature/auth/Register.tsx";
import { authApi } from "./api/authApi.ts";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <App />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: (
      <RedirectToHome>
        <Login />
      </RedirectToHome>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectToHome>
        <Register />
      </RedirectToHome>
      )
  },
  {
    path : '/auth/google',
    loader : async ({request}) => {
    const accessToken = request.url.split('=')[1]
    console.log(accessToken);
    authApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    console.log(authApi.defaults.headers.common['Authorization']);
    return redirect('/')
    }
}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <RouterProvider router={router} />
      </StateContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
