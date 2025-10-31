import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import {type ReactNode } from "react";

const isValidToken = (token: string | undefined): boolean => {
  return !!token && token.trim() !== "";
};

// CORRECT: children is directly in props, not nested
const GuestRoute = ({ children }: { children: ReactNode }) => {
  const token = Cookies.get("token");
  
  if (isValidToken(token)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Return children directly, not { children }
  return <>{children}</>;
};

export default GuestRoute;