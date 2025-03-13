import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const HomeNavBar = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white p-2 rounded-4 border border-2 border-black shadow-sm fixed-top m-3">
                <div className="container-fluid p-1">
                    <Link to="/" className="navbar-brand d-flex align-items-center text-dark">
                        <span className="fs-4 text-dark ms-2">Nimbus' PawPals</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-dark" href="#about-us">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#contact-us">Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#" onClick={() => { alert("this works but not yet implemented")}}>Products</a>
                            </li>
                        </ul>
                        <div className="d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
                            <div className="d-flex flex-column flex-lg-row mt-3 mt-lg-0 align-items-center">
                                <button className="btn btn-outline-success mb-2 mb-lg-0 me-lg-3" type="button" onClick={handleOpenModal}>Login</button>
                                <button className="btn btn-outline-warning " type="button" onClick={() => { alert("this works but not yet implemented")}}>Sign-Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <LoginModal show={showModal} handleClose={handleCloseModal} />
        </>
    );
};

export default HomeNavBar;
