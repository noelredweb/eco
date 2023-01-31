import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import {NavLink, useNavigate} from "react-router-dom";
import SignUpSchema from "../../validation/signup.validation";
import useAfterSignIn from "../../hooks/useAfterSignIn";
import showPopupError from "../../util/util";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const afterSignIn = useAfterSignIn();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    
    const validatedValue = Joi.validate(
      { email, password, name },
      SignUpSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedValue;

    if (error) {
      showPopupError(error);
      return
    }

    axios
      .post("/api/auth/signup", {
        name: name,
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
        afterSignIn(res.data.msg);
      }
        navigate("/");
      })
      .catch((err) => {
      });
  };

  return (
    <div>
      <div>
        Already have an account?
        <button className="btn btn-link" type="button">
          <NavLink className="nav-link active" aria-current="page" to="/login">
            Log In
          </NavLink>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
              value={name}
              onChange={handleNameChange}
          />
          {(!name || name.length < 2) && (
              <div id="emailHelp" className="form-text">
                Please provide name with at least 2 characters
              </div>
          )}
        </div>
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
          {(!password || password.length < 6) && (
              <div id="emailHelp" className="form-text">
                Please provide password with at least 6 characters
              </div>
          )}
        </div>
        <button type="submit" className="btn btn-dark" style={{margin: '10px 0px'}}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
