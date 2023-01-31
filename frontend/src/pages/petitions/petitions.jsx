import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

function filterBy(petitions, filter) {
    switch (filter) {
        case "all":
            return petitions;
        case "popular":
            return petitions.sort((petitionA, petitionB) => petitionB.performance - petitionA.performance);
        case "recent":
            return petitions.sort((petitionA, petitionB) => new Date(petitionB.createdAt) - new Date(petitionA.createdAt));
        case "victories":
            return petitions.filter((petition) => petition.victory === true);
        default:
            return petitions;
    }
}

function PetitionsPage() {
    const navigate = useNavigate();
    const [petitions, setPetitions] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        getPetitions();
    }, []);

    const getPetitions = () => {
        axios
            .get("/api/petitions/all")
            .then((res) => {
                if (res.data.length === 0) toast("no petitions");
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
        navigate(`/petitions/${_id}?back=petitions`)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col mx-auto" xs={12} md={8}>
                    <h2 className="text-center mb-4">Browse and Sign petitions for Change</h2>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12 text-center">
                    <button type="button" className={`btn btn-secondary ${filter === 'all' ? 'active' : ''}`} style={{ margin: '5px' }} onClick={() => handleFilter("all")}>All</button>
                    <button type="button" className={`btn btn-secondary ${filter === 'popular' ? 'active' : ''}`} style={{ margin: '5px' }} onClick={() => handleFilter("popular")}>Popular</button>
                    <button type="button" className={`btn btn-secondary ${filter === 'recent' ? 'active' : ''}`} style={{ margin: '5px' }} onClick={() => handleFilter("recent")}>Recent</button>
                    <button type="button" className={`btn btn-secondary ${filter === 'victories' ? 'active' : ''}`} style={{ margin: '5px' }} onClick={() => handleFilter("victories")}>Victories</button>
                </div>
            </div>
            <div className="row mb-3">
                {filteredPetitions.map((petition) => (
                    <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" key={petition._id}>
                        <div className="card mb-2 mt-2">
                            <img src={axios.defaults.baseURL + '/image/' + petition.image}  className="card-img-top" alt="petition img"></img>
                            <div className="card-body">
                                <div className="card-title" style={{ fontWeight: "bold" }}>{petition.title}</div>
                                <div className="card-text">{petition.description}</div>
                                <button type="button" className="btn btn-dark card-link" style={{ margin: '15px 0px 0px' }} onClick={() => viewPetition(petition._id)}>View</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PetitionsPage;
