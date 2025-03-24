import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

const HomeNavBar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false); 
    };

    const handleOpenRegisterModal = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false); 
    };

    const handleCloseModals = () => {
        setShowLoginModal(false);
        setShowRegisterModal(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white p-2 rounded-4 border border-2 border-black shadow-sm fixed-top m-3">
                <div className="container-fluid p-1">
                    <Link to="/" className="navbar-brand d-flex align-items-center text-dark">
                    <img
                            src="src/assets/navbar-logo.png"
                            alt="Nimbus' PawPals Logo"
                            style={{ maxWidth: "100px", width: "100px", height: "auto" }}
                        />
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
                                <Link className="nav-link text-dark" to="/Products">Products</Link>
                            </li>
                        </ul>
                        <div className="d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
                            <button className="btn btn-outline-success mb-2 mb-lg-0 me-lg-3" type="button" onClick={handleOpenLoginModal}>Login</button>
                            <button className="btn btn-outline-warning" type="button" onClick={handleOpenRegisterModal}>Sign-Up</button>
                        </div>
                    </div>
                </div>
            </nav>
            <LoginModal show={showLoginModal} handleClose={handleCloseModals} />
            <RegisterModal show={showRegisterModal} handleClose={handleCloseModals} />
        </>
    );
};

export default HomeNavBar;
