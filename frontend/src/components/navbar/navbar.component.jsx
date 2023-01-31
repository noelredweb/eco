import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshakeSimple } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const userData = useSelector((state) => state.auth.userData);
  const showLogin = () => {
    if (userData.email) {
      return (
          <Fragment>
            <li className="navbar nav-item nav-logout">
              <NavLink className="nav-link active" to="/logout">
                Logout
              </NavLink>
            </li>
          </Fragment>
      );
    }
    return (
        <Fragment>
          <li className="navbar nav-item nav-login">
            <NavLink className="nav-link active" aria-current="page" to="/login">
              Log In
            </NavLink>
          </li>
        </Fragment>
    );
  };

  return (
      <nav className="navbar navbar-dark navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-mobile navbar-light mb-3 bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0 align-items-center" style={{ flex: 6 }}>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  <FontAwesomeIcon icon={faHandshakeSimple} size="2x"/>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/start-a-petition">
                  Start a petition
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/me">
                  My petitions
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/petitions">
                  Browse
                </NavLink>
              </li>
            </ul>
            <div className="search" style={{ color: "white", flex: 1, display: "flex" }}>
              <div className="navbar-nav align-items-center" style={{ flex: 1 }}>
                  <NavLink className="nav-link active" to="/search">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                  </NavLink>
              </div>
              <div style={{ flex: 1 }}>{showLogin()}</div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
