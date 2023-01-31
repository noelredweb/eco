import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <Fragment>
            <footer className="bg-dark py-3 d-flex flex-wrap">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-3">
                            <ul className="list-unstyled">
                                <NavLink className="nav-link active text-light" aria-current="page" to="/about">
                                    About Us
                                </NavLink>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <ul className="list-unstyled">
                                <NavLink className="nav-link active text-light" aria-current="page" to="/contact">
                                    Contact Us
                                </NavLink>
                            </ul>
                        </div>
                        <ul className="nav col-md-3 mb-3 list-unstyled justify-content-evenly">
                            <li className="ms-3">
                                <a className="active text-light" href="https://facebook.com" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faFacebook} size="2x"/></a>
                            </li>
                            <li className="ms-3">
                                <a className="active text-light" href="https://twitter.com" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} size="2x"/></a>
                            </li>
                            <li className="ms-3">
                                <a className="active text-light" href="https://instagram.com" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} size="2x"/></a>
                            </li>
                        </ul>
                        <div className="col-md-3 active text-light">
                            Copyright © 2023, Nataliia. <br/> All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;
