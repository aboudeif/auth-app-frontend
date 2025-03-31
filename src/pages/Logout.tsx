import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { routeLinks, RoutesEnum } from "../enums";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate(routeLinks[RoutesEnum.LOGIN]);
    };
    performLogout();
  }, [navigate]);
  
  return <div>Logging out...</div>
}
