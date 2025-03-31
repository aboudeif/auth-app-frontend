import { useEffect, useState } from "react";
import { routeLinks, RoutesEnum } from "../enums"
import { logout } from "../services/authService"
import { useNavigate } from "react-router-dom";

export const Application: React.FC = () => {

  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false)
  const handleLogout = () => {
    logout();
    setSuccess(true);
  }

  useEffect(()=> {
    if(success) {
      navigate(routeLinks[RoutesEnum.LOGIN]);
    }
  }, [success])
  
  return (
    <div>
      <button onClick={handleLogout}>
          logout
        </button>
    </div>
  )
}
