import { useState, useEffect } from "react";
import {NavLink, useLocation} from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import useAfterSignIn from "../../hooks/useAfterSignIn";
import LogInSchema from "../../validation/login.validation";
import showPopupError from "../../util/util";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const afterSignIn = useAfterSignIn();

  useEffect(() => {
    if (location.state && location.state.email && location.state.password) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, [location]);

  useEffect(() => {
  }, [email]);

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      location.state &&
      location.state.email &&
      location.state.password
    ) {
      handleSubmit();
    }
  }, [email, password, location]);

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleSubmit = (ev) => {
    if (ev) ev.preventDefault();
    const validatedValue = Joi.validate({ email, password }, LogInSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      showPopupError(error);
      return;
    }
  
    axios
      .post("/api/auth/signin", {
        email: email,
        password: password,
      })
      .then((res) => {

      if(res.data.details) {
        showPopupError(res.data);
        return
      }

      if(res.data.status === "fail") {
        showPopupError(res.data);
        return
       }

        if (res.data.msg) { 
          afterSignIn(res.data.msg, true);
        }
      })
      .catch((err) => {
      });
    
  };
  return (
    <div>
      <div>
        Don't have an account?
        <button className="btn btn-link" type="button">
          <NavLink className="nav-link active" aria-current="page" to="/signup">
            Sign Up
          </NavLink>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmailChange}
          />
          {!email && (
              <div id="emailHelp" className="form-text">
                Please provide your email
              </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={handlePasswordChange}
          />
          <div className="position-relative">
            {(!password || password.length < 6) && (
                <div id="emailHelp" className="form-text">
                  Please provide password with at least 6 characters
                </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <button className="btn btn-link p-0" type="button">
            <NavLink className="nav-link active" aria-current="page" to="/forgot-password">
              Forgot password?
            </NavLink>
          </button>
        </div>
        <button type="submit" className="btn btn-dark" style={{margin: '10px 0px'}}>
          Log In
        </button>
      </form>
    </div>

  );
};

export default LogInPage;
