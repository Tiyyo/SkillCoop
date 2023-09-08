import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { StateContextProvider } from "./context/app.context.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./feature/auth/Login.tsx";

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
    element : <App />
},
{
    path: "/login",
    element : <Login />
}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <RouterProvider router={router}/>
      </StateContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
