import React from "react";
import { useRoutes } from "react-router-dom";

import RouteHandler from "./components/RouteHandler";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";

const Routes = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/ad/:id", element: <AdPage /> },
    {
      path: "/post-an-ad",
      element: (
        <RouteHandler isPrivate>
          <AddAd />
        </RouteHandler>
      ),
    },
    { path: "*", element: <NotFound /> },
  ]);
};

export default Routes;
