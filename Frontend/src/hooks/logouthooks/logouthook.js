// src/hooks/auth/useLogout.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout as logoutAction} from "../../ReduxFeatures/auth/auth.slice";
import { persistor } from "../../reduxStorage/redux.store";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout= async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout", {}, {
        withCredentials: true,
      });

      dispatch(logoutAction()); // clear user state
      await persistor.purge();
      navigate("/login");        // redirect to login
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return handlelogout;
};
