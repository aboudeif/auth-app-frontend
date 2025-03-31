import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageKeyEnum } from '../enums';
import { routeLinks, RoutesEnum } from '../enums';
import { getAuthUser } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getAuthUser(StorageKeyEnum.AUTH_USER);
      
      if (requireAuth && !user) {
        navigate(routeLinks[RoutesEnum.LOGIN]);
      } else if (!requireAuth && user) {
        navigate(routeLinks[RoutesEnum.APPLICATION]);
      }
    };

    checkAuth();
  }, [navigate, requireAuth]);

  return <>{children}</>;
}; 