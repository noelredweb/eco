import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

function filterBy(petitions, filter) {
    switch (filter) {
        case "started":
            return petitions ? petitions.started : petitions
        case "signed":
            return petitions ? petitions.signed : petitions
        case "favorites":
            return petitions ? petitions.favorites : petitions
        default:
            return petitions;
    }
}

function MyPetitionsPage() {
    const navigate = useNavigate();
    const [petitions, setPetitions] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const [filter, setFilter] = useState("started");

    useEffect(() => {
        if (!userData || !userData.email) {
            navigate('/login')
            return
        }
        getMyPetitions();
    }, []);

    const getMyPetitions = () => {
        axios
            .get("/api/petitions/me")
            .then((res) => {
                if (!res.data) {
                    toast("you have no petitions");
                }
                setPetitions(res.data);
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

    const handleFilter = (filterType) => {
        setFilter(filterType);
    };

    const filteredPetitions = filterBy(petitions, filter);

    const viewPetition = (_id) => {
        navigate(`/petitions/${_id}?back=me`)
    }

    const updatePetition = (_id) => {
        navigate(`/start-a-petition/${_id}`)
    }

    const deletePetition = (_id) => {
        if (!_id) {
            return
        }
        axios
            .delete(`/api/petitions/petition/${_id}`)
            .then((res) => {
                if (!res || !res.data || res.data.length === 0) {
                    toast.error("cannot remove petitions", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return
                }
                const started = petitions?.started?.filter((petition) => petition._id !== _id) || petitions?.started
                setPetitions({
                    started,
                    signed: petitions.signed,
                    favorites: petitions.favorites,
                });
            })
            .catch((err) => {
                toast.error("cannot remove petitions", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col mx-auto" xs={12} md={8}>
                    <h2 className="text-center mb-4">Welcome, {userData.email}</h2>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12 text-center">
                    <button type="button" className={`btn btn-secondary ${filter === 'started' ? 'active' : ''}`} style={{ margin: '5px' }} onClick={() => handleFilter("started")}>Started</button>
                    <button type="button" className={`btn btn-secondary ${filter === 'signed' ? 'active' : ''}`} style={{ margin: '5px' }} onClick={() => handleFilter("signed")}>Signed</button>
                    <button type="button" className={`btn btn-secondary ${filter === 'favorites' ? 'active' : ''}`} style={{ margin: '5px' }} onClick={() => handleFilter("favorites")}>Favorites</button>
                </div>
            </div>
            <div className="row mb-3">
                {filteredPetitions && filteredPetitions.map((petition) => (
                    <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" key={petition._id}>
                        <div className="card mb-2 mt-2">
                            <div className='petition-img'>
                                <img src={axios.defaults.baseURL + '/image/' + petition.image}  className="card-img-top" alt=""></img>
                            </div>
                            <div className="card-body">
                                <div className="card-title" style={{ fontWeight: "bold" }}>{petition.title}</div>
                                <div className="card-text">{petition.description}</div>
                                <button type="button" className="btn btn-dark" style={{ margin: '15px 0px 0px' }} onClick={() => viewPetition(petition._id)}>View</button>
                                {filter === "started" && (
                                    <span>
                                        <button type="button" className="btn btn-dark" style={{ margin: '15px 10px 0px' }} onClick={() => updatePetition(petition._id)}>Update</button>
                                        <button type="button" className="btn btn-dark" style={{ margin: '15px 0px 0px' }} onClick={() => deletePetition(petition._id)}>Delete</button>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filter === "started" && (
                <div className="row mb-3">
                    <div className="col p-0">
                        <div>
                            <button type="button" className="btn btn-dark">
                                <NavLink className="nav-link active" aria-current="page" to="/start-a-petition">
                                Start a petition
                                </NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyPetitionsPage;
