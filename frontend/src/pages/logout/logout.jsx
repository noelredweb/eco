import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authActions.logout()); //clear redux
    localStorage.clear(); //clear local storage
    navigate("/");
  }, []);

  return <Fragment></Fragment>;
};
export default LogoutPage;
