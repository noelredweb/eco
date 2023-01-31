import React, { useState } from 'react';
import Joi from "joi-browser";
import ForgotPasswordSchema from "../../validation/forgot-password.validation";
import showPopupError from "../../util/util";
import axios from "axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value);
    };

    const handleSubmit = (ev) => {
        if (ev) ev.preventDefault();
        const validatedValue = Joi.validate({ email }, ForgotPasswordSchema, {
            abortEarly: false,
        });
        const { error } = validatedValue;
        if (error) {
            showPopupError(error);
            return;
        }

        axios
            .post("/api/auth/forgot-password", {
                email: email,
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

                setMessage(true)

            })
            .catch((err) => {
                setMessage(null);
            });
    };

    return (
        <div>
            {message && ( <div className="alert alert-success" role="alert">
                <p>An email with a link to reset your password has been sent to {email}</p>
            </div>)}
            <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
                <form onSubmit={handleSubmit} className="p-3" style={{width: "50%"}}>
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
                    <button type="submit" className="btn btn-dark">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
