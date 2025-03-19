import React from 'react';
import HomeNavBar from '../components/NavBars/HomeNavBar.jsx';
import { useState } from 'react';
import RegisterModal from '../components/RegisterModal.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const [contactMessage, setContactMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleContactUs = (event) => {
        event.preventDefault();

        setContactMessage("Thank you for reaching out! We'll get back to you soon.");

        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => {
            setContactMessage("");
        }, 5000);
    };

    const handleOpenSignUp = () => {
        setShowRegisterModal(true);
    };

    const handleCloseSignUp = () => {
        setShowRegisterModal(false);
    }


    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center pt-5 w-100">

                {/* Navbar Section */}
                <div className='mb-4 w-100'>
                    <HomeNavBar />
                </div>

                {/* Main Content */}
                <div
                    className="d-flex flex-column flex-md-row justify-content-center align-items-center container mb-0 border border-2 border-black rounded-4 shadow-sm p-4 container-fluid"
                    style={{
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.64)",
                        WebkitBackdropFilter: "blur(10px)",
                        width: "100%",
                        maxWidth: "1200px",
                    }}
                >
                    <div className="text-center m-2">
                        <img
                            src="src/assets/pet-logo.png"
                            alt="Nimbus' PawPals Logo"
                            style={{ maxWidth: "1000px", width: "100%", height: "auto" }}
                        />
                    </div>
                    <div className="text-center mt-4 m-3">
                        <h1 className='m-1 mb-3 fs-2 fs-md-1'>Welcome to Nimbus' PawPals!</h1>
                        <p className='fs-6 fs-md-5'>
                            Your pet’s new best friend! 🐾✨ Nimbus’ PawPals is the purrfect mix of fun and care,
                            offering a one-stop shop for all your pet’s needs. Whether you’re shopping for toys,
                            booking a vet appointment, or pampering your furry friend with a grooming session, we’ve got it covered.
                        </p>
                        <div className='p-1 m-1 mt-4'>
                            <button
                                className="btn"
                                style={{ backgroundColor: "#FF7F50", color: "#fff" }}
                                type="button"
                                onClick={() => { navigate('/Products') }}
                            >
                                Browse
                            </button>
                        </div>
                    </div>
                </div>

                {/* About Us Section */}
                <div
                    className="container-fluid mt-5"
                    id='about-us'
                >
                    <h2 className="text-center mb-4">About Us</h2>

                    {/* First Field */}
                    <div
                        className="row align-items-center mb-5"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            padding: "25px",
                            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div className="col-md-6 p-3">
                            <h4 className="mb-4">🐾 Our Story 🐾</h4>
                            <p>
                                Nimbus' PawPals began with a simple idea, creating a happy place for pets and their people. Inspired by our love for animals, we built a cozy spot where pets can be pampered, cared for, and celebrated. Because at Nimbus’ PawPals, every paw matters and every cuddle counts! 🐶🐾✨
                            </p>
                        </div>
                        <div className="col-md-6 p-3 text-center">
                            <img
                                src="src/assets/our-story-pic.jpg"
                                alt="Our Story"
                                className="img-fluid rounded-4 shadow-sm"
                                style={{
                                    maxWidth: "380px",
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </div>
                    </div>

                    {/* Second Field */}
                    <div
                        className="row align-items-center mb-5 flex-md-row-reverse"
                        style={{
                            backgroundColor: "#f8f8f8", // Slightly off-white background for variety
                            borderRadius: "12px", // Rounded corners for field
                            padding: "25px", // Balanced padding
                            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
                        }}
                    >
                        <div className="col-md-6 p-3">
                            <h4 className="mb-4">🐾 What We Offer 🐾</h4>
                            <p>At <strong>Nimbus' PawPals</strong>, we’ve got everything your furry friend needs:</p>
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-start">
                                    <strong>🍖 Healthy Food & Treats</strong> – Delicious, nutritious meals and snacks.
                                </div>
                                <div className="d-flex align-items-start">
                                    <strong>🧸 Toys & Accessories</strong> – Fun toys and cozy essentials.
                                </div>
                                <div className="d-flex align-items-start">
                                    <strong>🏥 Vet Care</strong> – Professional check-ups and health services.
                                </div>
                                <div className="d-flex align-items-start">
                                    <strong>✂️ Grooming & Spa</strong> – Pampering to keep them fresh and fabulous.
                                </div>
                                <div className="d-flex align-items-start">
                                    <strong>🏨 Pet Hotel</strong> – Safe, comfy stays while you're away.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 p-3 text-center">
                            <img
                                src="src/assets/car-care-pic.jpg"
                                alt="What We Offer"
                                className="img-fluid rounded-4 shadow-sm"
                                style={{
                                    maxWidth: "380px",
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </div>
                    </div>

                    {/* Third Field */}
                    <div
                        className="row align-items-center mb-5"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            padding: "25px",
                            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div className="col-md-6 p-3">
                            <h4 className="mb-3">Why Choose Us</h4>
                            <p>
                                While browsing products is available to everyone, being a registered client opens up a world of exclusive benefits!
                            </p>
                            <p>
                                <strong>As a client, you'll enjoy:</strong>
                            </p>
                            <p>
                                • Full access to product details and exclusive offers.<br />
                                • The ability to book appointments for vet care, grooming, and more.<br />
                                • Tracking of your pet’s health records and appointment history.<br />
                                • Access to premium services, including our pet hotel.<br />
                            </p>
                            <p>
                                <strong>Sign up today</strong> to unlock all the amazing services we offer and make your pet’s experience with us even better!
                            </p>
                            <div className="d-flex justify-content-center mt-3">
                                <button className="btn btn-primary rounded-pill px-4 py-2" onClick={handleOpenSignUp}>
                                    Sign-Up
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 p-3 text-center">
                            <img
                                src="src/assets/sign-up-icon.png"
                                alt="Why Choose Us"
                                className="img-fluid rounded-4 "
                                style={{
                                    maxWidth: "420px",
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Pet Care Tips Section */}
                <div className="container-fluid mt-2 mb-5">
                    <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '500', color: '#333' }}>Pet Care Tips</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-4 mb-4">
                            <div className="card p-4 shadow-sm border-0 rounded-3" style={{ backgroundColor: '#fff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                <h5 className="text-center mb-3" style={{ fontSize: '1.25rem', color: '#FF7F50' }}>Healthy Feeding</h5>
                                <p className="text-center" style={{ fontSize: '1rem', color: '#555' }}>Learn the right diet for your pet’s breed and size to keep them healthy.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-4 shadow-sm border-0 rounded-3" style={{ backgroundColor: '#fff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                <h5 className="text-center mb-3" style={{ fontSize: '1.25rem', color: '#4C6EF5' }}>Regular Exercise</h5>
                                <p className="text-center" style={{ fontSize: '1rem', color: '#555' }}>Explore the best routines to keep your pet fit and active, maintaining their vitality.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-4 shadow-sm border-0 rounded-3" style={{ backgroundColor: '#fff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                <h5 className="text-center mb-3" style={{ fontSize: '1.25rem', color: '#32CD32' }}>Grooming Essentials</h5>
                                <p className="text-center" style={{ fontSize: '1rem', color: '#555' }}>Keep your pet looking their best with minimal stress and maximum care.</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Contact Us Section */}
                <div className="container-fluid mb-5" id="contact-us">
                    <h2 className="text-center mb-3" style={{ letterSpacing: '1px', fontSize: '2rem' }}>Contact Us</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8">
                            <div className="card shadow-lg p-5 rounded-4">
                                <h3 className="text-center mb-4" style={{ fontSize: '1.7rem', fontWeight: '500' }}>We’d love to hear from you!</h3>
                                <form onSubmit={handleContactUs}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="form-label fw-semibold" style={{ fontSize: '1.1rem' }}>Full Name</label>
                                        <input type="text" className="form-control border-0 rounded-3 shadow-sm" id="name" required placeholder="Enter your full name" style={{ padding: '12px 15px', fontSize: '1rem' }} value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fw-semibold" style={{ fontSize: '1.1rem' }}>Email Address</label>
                                        <input type="email" className="form-control border-0 rounded-3 shadow-sm" id="email" required placeholder="Enter your email" style={{ padding: '12px 15px', fontSize: '1rem' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="form-label fw-semibold" style={{ fontSize: '1.1rem' }}>Message</label>
                                        <textarea className="form-control border-0 rounded-3 shadow-sm" id="message" rows="5" required placeholder="Write your message here..." style={{ padding: '12px 15px', fontSize: '1rem' }} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-gradient w-100 rounded-pill py-3 mt-3" style={{ fontSize: '1.1rem', background: 'linear-gradient(45deg, #4C6EF5, #9B59B6)', border: 'none', color: '#fff' }}>
                                        Send Message
                                    </button>
                                </form>
                                {contactMessage && <div className="alert alert-primary mt-3" role="alert">{contactMessage}</div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional Footer */}
                <div className="bg-light text-center p-3 border-top rounded-pill w-100">
                    <div className="container">
                        <p className="mb-0">© 2025 Nimbus' PawPals. All rights reserved.</p>
                    </div>
                </div>
            </div >

            {/* Register Modal */}
            <RegisterModal show={showRegisterModal} handleClose={handleCloseSignUp} />
        </>
    );
};

export default Home;
