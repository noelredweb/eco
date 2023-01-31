import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import Joi from "joi-browser";
import showPopupError from "../../util/util";
import StartPetitionSchema from "../../validation/start-a-petition.validation";

const StartPetition = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [image, setImage] = useState(null);
    const [goal, setGoal] = useState(5000);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {

        if (!userData || !userData.email) {
            navigate('/login')
            return
        }

        if (!params || !params.id) {
            return
        }

        axios
            .get(`/api/petitions/petition/${params.id}`)
            .then((res) => {
                if (!res.data || res.data.length < 1) {
                    toast("you have no petitions");
                    return;
                }
                // need to replace separated states to one object Petition
                const petition = res.data
                setTitle(petition.title)
                setDescription(petition.description)
                setGoal(petition.goal)
                setImage(petition.image)
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

    }, [])

    const handleFile = e => {
        setImage(e.target.files[0]);
    };

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
        const validatedValue = Joi.validate({ title, description, goal }, StartPetitionSchema, {
            abortEarly: false,
        });
        const { error } = validatedValue;
        if (error) {
            showPopupError(error);
            return;
        }

        // 👇 Create new FormData object and append files
        const formData = new FormData();
        if (typeof image !== 'string') {
            formData.append('image', image);
        }
        formData.append('title', title);
        formData.append('goal', goal);
        formData.append('description', description);

        if (!params || !params.id) {

            axios
                .post("/api/petitions/create", formData)
                .then((data) => {
                    toast("new petition created");
                    navigate('/me')
                })
                .catch((err) => {
                    showError(err);
                });
            return
        }

        axios
            .post(`/api/petitions/update/${params.id}`, formData)
            .then((data) => {
                toast("petition updated");
                navigate('/me')
            })
            .catch((err) => {
                showError(err);
            });

    };

    const handleGoalChange = (ev) => {
        setGoal(ev.target.value)
    }

    const handleDescriptionChange = (ev) => {
        setDescription(ev.target.value)
    }

    const handleTitleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onCancelClick = () => {
        navigate('/me')
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col mx-auto" xs={12} md={8}>
                    <h2 className="text-center mb-4">Start a Petition</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label htmlFor="goal" className="form-label">Title</label>
                            <input type="text" name="title" id="title" className="form-control" value={title} onChange={handleTitleChange} />
                            {(!title || title.length < 3) && (
                                <div id="emailHelp" className="form-text">
                                    Please provide title with at least 3 characters
                                </div>
                            )}
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="image" className="form-label">Attach Image</label>
                            <input type="file" name="image" id="image" onChange={handleFile} className="form-control" />
                            {image && (
                                <div className="row mb-3" style={{ margin: '30px 0px', border: '1px solid black', borderRadius: '0.375rem'}}>
                                    <img src={typeof image === 'string' ? (axios.defaults.baseURL + '/image/' + image) : URL.createObjectURL(image)} alt="attached" max-width="200" max-height="200" />
                                </div>)
                            }
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" id="description" maxLength={1000} rows={10} className="description-textarea form-control" value={description} onChange={handleDescriptionChange} />
                            {(!description || description.length < 6) && (
                                <div id="emailHelp" className="form-text">
                                    Please provide description with at least 6 characters
                                </div>
                            )}
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="goal" className="form-label">Goal</label>
                            <input type="number" name="goal" id="goal" className="form-control" value={goal} onChange={handleGoalChange} />
                            {(!goal || goal.length < 1) && (
                                <div id="emailHelp" className="form-text">
                                    Please provide goal with at least 1 characters
                                </div>
                            )}
                        </div>
                        <div className="row mb-3">
                            <div className="col p-0">
                                {(!params || !params.id) && (
                                    <button type="submit" className="btn btn-dark">Start</button>
                                )}
                                { params && params.id && (
                                    <div>
                                        <button type="submit" className="btn btn-dark ms-3">
                                            Update
                                        </button>
                                        <button type="button" className="btn btn-dark ms-3" onClick={onCancelClick}>
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StartPetition;
