import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const isValidToken = (token: string | undefined) => {
  return token && token.trim() !== "";
};

// Option 1: Using React.FC with children prop
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = Cookies.get("token");
  
  if (!isValidToken(token)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;