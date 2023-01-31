import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [petitions, setPetitions] = useState([]);

    const location = useLocation();

    useEffect(() => {
        searchPetitions();
    }, []);

    const searchPetitions = () => {
        const queryParam = (new URLSearchParams(location.search)).get('q')
        if (!queryParam) {
            return
        }

        axios
            .get(`/api/petitions/search?q=${queryParam}`)
            .then((res) => {
                setSearchTerm(queryParam)
                setPetitions(res.data || []);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/search?q=${searchTerm}`;
    };

    const viewPetition = (_id) => {
        navigate(`/petitions/${_id}?back=search`)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col" xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input className="form-control"
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-dark" type="submit">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        {petitions.map((petition) => (
                            <div className="m-3 col col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" key={petition._id}>
                                <div className="card mb-2 mt-2">
                                    <img src={axios.defaults.baseURL + '/image/' + petition.image}  className="card-img-top" alt="Petition image"></img>
                                    <div className="card-body">
                                        <div className="card-title" style={{ fontWeight: "bold" }}>{petition.title}</div>
                                        <div className="card-text">{petition.description}</div>
                                        <button type="button" className="btn btn-dark" style={{ margin: '15px 0px 0px' }} onClick={() => viewPetition(petition._id)}>View</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        { !petitions || petitions.length === 0 && (
                            <div className="row h-100 m-5">
                                There is no petitions by the entered search text
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
