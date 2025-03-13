import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-2 rounded-4 border border-2 border-black shadow-sm fixed-top m-3">
            <div className="container-fluid p-1">

                {/* === Left Section === */}
                <Link to="/" className="navbar-brand d-flex align-items-center text-dark">
                    <span className="fs-4 text-dark ms-2">Nimbus' PawPals</span>
                </Link>

                {/* Toggle button for mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* === Right Section === */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active text-dark" aria-current="page" href="#about-us">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#contact-us">Contact Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">Products</a> {/*  not yet implemented */}
                        </li>
                    </ul>

                    {/* Right section: Search + Buttons */}
                    <div className="d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
                        {/* Search */}
                        <form className="d-flex mb-2 mb-lg-0 me-5" role="search">
                            <input
                                className="form-control rounded-pill me-2"
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-info" type="button">Search</button>
                        </form>

                        {/* Buttons */}
                        <div className="d-flex flex-column flex-lg-row mt-3 mt-lg-0 align-items-center">
                            <button className="btn btn-outline-success mb-2 mb-lg-0 me-lg-3" type="button">Login</button>
                            <button className="btn btn-outline-warning " type="button">Sign-Up</button>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default HomeNavBar;
