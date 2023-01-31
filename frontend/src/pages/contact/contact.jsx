import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Joi from "joi-browser";
import showPopupError from "../../util/util";
import ContactSchema from "../../validation/contact.validation";

const ContactPage = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleFullNameChange = (ev) => {
        setFullName(ev.target.value)
    }

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value)
    }

    const handleMessageChange = (ev) => {
        setMessage(ev.target.value)
    }

    const showError = (err) => {
        if (err && err.response && err.response.data && err.response.data.details) {
            for (let item of err.response.data.details) {
                toast.error(item.message.replaceAll("", ""));
            }
        }
    }

    const handleSubmit = (ev) => {
        if (ev) ev.preventDefault();
        const validatedValue = Joi.validate({ fullName, email, message }, ContactSchema, {
            abortEarly: false,
        });
        const { error } = validatedValue;
        if (error) {
            showPopupError(error);
            return;
        }

        axios
            .post("/api/contactus", {
                fullName,
                email,
                message
            })
            .then((data) => {
                toast("Your message was sent successfully");
                setFullName('')
                setEmail('')
                setMessage('')
            })
            .catch((err) => {
                showError(err);
            });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2 className="text-center mb-4">Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label htmlFor="fullName" className="form-label p-0">Full Name</label>
                            <input type="text" name="fullName" id="fullName" className="form-control" value={fullName} onChange={handleFullNameChange} />
                            {(!fullName || fullName.length < 2) && (
                                <div id="emailHelp" className="form-text p-0">
                                    Please provide full name with at least 2 characters
                                </div>
                            )}
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="email" className="form-label p-0">Email</label>
                            <input type="text" name="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
                            {!email && (
                                <div id="emailHelp" className="form-text p-0">
                                    Please provide your email
                                </div>
                            )}
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="message" className="form-label p-0">Message</label>
                            <textarea name="message" id="message" maxLength={1000} rows={10} className="form-control" value={message} onChange={handleMessageChange} />
                            {(!message || message.length < 10) && (
                                <div id="emailHelp" className="form-text p-0">
                                    Please provide message with at least 10 characters
                                </div>
                            )}
                        </div>

                        <div className="row mb-3">
                            <div className="p-0">
                                <button type="submit" className="btn btn-dark">Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;