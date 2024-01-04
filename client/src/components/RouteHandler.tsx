import { Navigate } from "react-router-dom";
import { isLogged } from "../helpers/AuthHandler";
import React from "react";

interface RouteHandlerProps {
  children: React.ReactNode;
  isPrivate?: boolean;
}

const RouteHandler = (props: RouteHandlerProps) => {
  const { children, isPrivate = false } = props;

  if (isPrivate && !isLogged()) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default RouteHandler;
