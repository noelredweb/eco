import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";

const useAfterSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (token, defaultNavigate) => {
    localStorage.setItem("token", token);
    dispatch(authActions.login()); 
    const payload = jwt_decode(token)
    dispatch(authActions.updateUserData(payload));
    if (defaultNavigate) {
      navigate('/')
    }
  };
};

export default useAfterSignIn;
