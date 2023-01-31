import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {useSelector} from "react-redux";
import Joi from "joi-browser";
import showPopupError from "../../util/util";
import PetitionViewSchema from "../../validation/petition-view.validation";

const PetitionViewPage = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [petition, setPetition] = useState([]);
    const [favorite, setFavorite] = useState((localStorage.getItem(`PETITION_${params.id}`) === 'true') || false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        getMyPetitions();
    }, []);

    const getMyPetitions = () => {
        axios
            .get(`/api/petitions/petition/${params.id}`)
            .then((res) => {
                if (res.data.length === 0) toast("you have no petition by id");
                setPetition(res.data);
            })
            .catch((err) => {
                toast.error("cannot get petitions", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const handleBack = () => {
        const back = (new URLSearchParams(location.search)).get('back') || ''
        navigate(`/${back}`)
    }

    const handleFirstNameChange = (ev) => {
        setFirstName(ev.target.value)
    }

    const handleLastNameChange = (ev) => {
        setLastName(ev.target.value)
    }

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value)
    }

    const showError = (err) => {
        if (err && err.response && err.response.data && err.response.data.details) {
            for (let item of err.response.data.details) {
                toast.error(item.message.replaceAll("", ""));
            }
        }
        if (err?.response?.statusText === "Unauthorized") {
            toast.error('The token is expired. Login again');
            navigate('/logout')
        }
    }

    const handleSubmit = (ev) => {
        if (ev) ev.preventDefault();
        const validatedValue = Joi.validate({ firstName, lastName, email }, PetitionViewSchema, {
            abortEarly: false,
        });
        const { error } = validatedValue;
        if (error) {
            showPopupError(error);
            return;
        }

        axios
            .post("/api/signatures/create", {
                firstName,
                lastName,
                email,
                petitionId: petition._id
            })
            .then((data) => {
                toast("The petition was sent signed successfully. Thanks a lot for your Support!");
                setFirstName('')
                setLastName('')
                setEmail('')
                getMyPetitions()
            })
            .catch((err) => {
                showError(err);
            });
    }

    const favoriteClick = (ev) => {
        ev.preventDefault();

        const shouldIncrease = !(localStorage.getItem(`PETITION_${params.id}`) === 'true')

        if (!shouldIncrease && (!userData || !userData.email)) {
            localStorage.setItem(`PETITION_${params.id}`, !favorite);
            setFavorite(!favorite)
            return
        }

        axios
            .post("/api/favorites/create", {
                shouldIncrease,
                petitionId: petition._id,
                value: !favorite
            })
            .then((data) => {
                localStorage.setItem(`PETITION_${params.id}`, !favorite);
                setFavorite(!favorite)
            })
            .catch((err) => {
                showError(err);
            });
    }

    if (!petition) {
        return
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-lg-12 text-center">
                    <h2 className="mt-2">{petition.title}</h2>
                </div>

                <div className="col-lg-6">
                    {petition.image && (
                        <div>
                            <img src={axios.defaults.baseURL + '/image/' + petition.image} className="img-fluid mb-3" style={{ margin: '20px 0px', borderRadius: '8px'}} alt="petition image" />
                        </div>
                    )}

                    <div className="text-end"><FontAwesomeIcon style={{ cursor: 'pointer'}} icon={favorite === true ? faHeartSolid : faHeartRegular} size="2x" onClick={favoriteClick}/></div>
                </div>

                <div className="col-lg-6 text-left">
                    <div className="row m-4">
                        <div className="p-0"><b>{petition.performance} have signed</b>. Let's get to {petition.goal}!</div>
                        <div className="progress mb-3">
                            <div className="progress-bar" role="progressbar" style={{width: petition.performanceRate + '%'}}></div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label htmlFor="firstName" className="form-label p-0">First Name</label>
                                <input type="text" name="firstName" id="firstName" className="form-control" value={firstName} onChange={handleFirstNameChange} />
                                {(!firstName || firstName.length < 2) && (
                                    <div id="emailHelp" className="form-text p-0">
                                        Please provide first name with at least 2 characters
                                    </div>
                                )}
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="lastName" className="form-label p-0">Last Name</label>
                                <input type="text" name="lastName" id="lastName" className="form-control" value={lastName} onChange={handleLastNameChange} />
                                {(!lastName || lastName.length < 2) && (
                                    <div id="emailHelp" className="form-text p-0">
                                        Please provide last name name with at least 2 characters
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
                                <button type="submit" className="btn btn-dark">Sign this Petition</button>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="col-lg-6">
                    <p className="mb-3">{petition.description}</p>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <button type="button" className="btn btn-dark" onClick={handleBack}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetitionViewPage;
