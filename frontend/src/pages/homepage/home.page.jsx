import React, { Fragment, useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const HomePage = () => {

    const [victories, setVictories] = useState([])

    useEffect(() => {
        getVictories();
    }, []);

    const getVictories = () => {
        axios
            .get("/api/petitions/victories")
            .then((res) => {
                if (res.data.length === 0) toast("no victories");
                setVictories(res.data);
            })
            .catch((err) => {
                toast.error("cannot get victories", {
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

  return (
    <Fragment>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1 className="mt-4">Welcome to our petitions platform!</h1>
                    <h2 className="mt-2">Unite for change, speak up for a better future!</h2>
                </div>
                <div className="col-lg-12 text-center">
                    <div>
                        <button type="button" className="btn btn-dark" style={{ margin: '15px' }}>
                            <NavLink className="nav-link active" aria-current="page" to="/start-a-petition">
                            Start a petition
                            </NavLink>
                        </button>
                    </div>
                </div>
                <div id="carouselExample" className="carousel slide" data-ride="carousel" style={{ margin: '15px 0px' }}>
                    <ol className="carousel-indicators">
                        <li data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" key='0'></li>
                        <li data-bs-target="#carouselExample" data-bs-slide-to="1" key='1'></li>
                        <li data-bs-target="#carouselExample" data-bs-slide-to="2" key='2'></li>
                        {victories.map((victory, index) => (
                            <li data-bs-target="#carouselExample" data-bs-slide-to={index + 3} key={index +3}></li>
                        ))}
                    </ol>
                    <div className="carousel-inner">
                        {victories.map((victory) => (
                            <div className="carousel-item text-center" key={victory._id}>
                                {victory.image && (
                                    <img src={axios.defaults.baseURL + '/image/' + victory.image} className="img-fluid mb-3" style={{ margin: '20px 0px', borderRadius: '8px'}} alt="victory image" />
                                )}
                                <div className='carousel-caption d-none d-md-block'>
                                    <h3 style={{ color: 'black' }}>{victory.title}</h3>
                                    <p style={{ color: 'black' }}>{victory.description}</p>
                                    <NavLink className="nav-link active" aria-current="page" to={`/petitions/${victory._id}?back=`} style={{ color: '#0d6efd', textDecoration: 'underline' }}>
                                        more...
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                        <div className="carousel-item text-center">
                            <img src="/images/home-view-1.jpeg" className="img-fluid" alt="First slide"></img>
                            <div className='carousel-caption d-none d-md-block'>
                                <h3 style={{ color: 'black' }}>Start Petition with us</h3>
                                <p style={{ color: 'black' }}>Make your voice heard by starting a petition today.</p>
                            </div>
                        </div>
                        <div className="carousel-item text-center">
                            <img src="/images/home-view-2.jpeg" className="img-fluid" alt="Second slide"></img>
                            <div className='carousel-caption d-none d-md-block'>
                                <h3 style={{ color: 'black' }}>Just Do It!</h3>
                                <p style={{ color: 'black' }}>Gather support for the cause you care about and create real change.</p>
                            </div>
                        </div>
                        <div className="carousel-item active text-center">
                            <img src="/images/home-view-3.jpeg" className="img-fluid" alt="Third slide"></img>
                            <div className='carousel-caption d-none d-md-block'>
                                <h3 style={{ color: 'black' }}>Need you Support</h3>
                                <p style={{ color: 'black' }}>Start a petition, mobilize supporters, and bring your issue to the attention of decision makers.</p>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" data-bs-target="#carouselExample" type="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" data-bs-target="#carouselExample" type="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
                <div>
                    <p className="lead">Our platform is a place where individuals and organizations can come together to
                        create change. We believe that collective action is powerful, and that by working together, we
                        can make a real difference in the world.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <p>On our platform, you can create petitions on any issue that you are passionate about. Whether you
                        want to raise awareness about a specific cause, or push for policy changes at the local or
                        national level, our platform is here to support you. By creating a petition, you can engage with
                        like-minded individuals and organizations, build a community of supporters, and make your voice
                        heard.</p>
                </div>
                <div className="col-lg-6">
                    <p>Once your petition is created, you can share it with your friends, family, and community. You can
                        also use our platform to connect with other petitions that align with your cause and collaborate
                        with their creators to build a larger movement. Our platform also allows you to track the
                        progress of your petition, so you can see how many people have signed and how much attention
                        your campaign is getting.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <p>Our platform is not just for individuals, but also for organizations and groups. If you are an
                        organization working on a specific cause, you can use our platform to raise awareness and
                        mobilize supporters. By creating petitions and engaging with the community, you can create real
                        change and impact.</p>
                    <p>We also believe that transparency is key in any campaign, That's why we have a dedicated section
                        for petitions that have succeeded and the actions that have been taken as a result, This will
                        not only help you understand the impact of petitions and how they can create change, but it will
                        also inspire you to create your own petitions and make a difference.</p>
                    <p>In short, our petitions platform is here to empower you to create change. Whether you are an
                        individual, an organization, or a group, we believe that together, we can make a difference. So,
                        take a look around, create a petition, and start making your voice heard today!</p>
                </div>
            </div>
        </div>

    </Fragment>
  );
};

export default HomePage;