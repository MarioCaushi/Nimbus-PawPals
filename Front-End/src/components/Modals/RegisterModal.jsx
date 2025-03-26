import React, { useState } from 'react';

const RegisterModal = ({ show, handleClose }) => {
    const showHideClassName = show ? "modal show d-block" : "modal d-none";
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <div className={showHideClassName} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow-lg" style={{ borderRadius: '15px', border: 'none' }}>
                    <div className="modal-header" style={{ borderBottom: '2px solid #dee2e6', backgroundColor: '#f8f9fa' }}>
                        <h5 className="modal-title" style={{ fontSize: '1.5rem' }}>Register</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ padding: '2rem' }}>
                        <form>
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label" style={{ fontSize: '1.1rem' }}>First Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label" style={{ fontSize: '1.1rem' }}>Last Name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                                </div>
                            </div>
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="username" className="form-label" style={{ fontSize: '1.1rem' }}>Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Choose a username" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="password" className="form-label" style={{ fontSize: '1.1rem' }}>Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Create a password" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                                </div>
                            </div>
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label" style={{ fontSize: '1.1rem' }}>Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="contactNumber" className="form-label" style={{ fontSize: '1.1rem' }}>Contact Number</label>
                                    <input type="text" className="form-control" id="contactNumber" placeholder="Enter your contact number" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                                </div>
                            </div>
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3"> 
                                    <label htmlFor="birthday" className="form-label" style={{ fontSize: '1.1rem' }}>Birthday</label>
                                    <input type="date" className="form-control" id="birthday" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                                </div>
                                <div className="col-md-6 mb-3"> 
                                    <label htmlFor="preferredCommunication" className="form-label" style={{ fontSize: '1.1rem' }}>Preferred Communication</label>
                                    <select className="form-select" id="preferredCommunication" style={{ borderRadius: '12px', fontSize: '1rem' }}>
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-5 m-2">
                                <label htmlFor="address" className="form-label" style={{ fontSize: '1.1rem' }}>Address</label>
                                <input type="text" className="form-control" id="address" placeholder="Enter your address" style={{ borderRadius: '12px', fontSize: '1rem' }} />
                            </div>

                            <div className="d-flex gap-2 align-items-center justify-content-center">
                                <button type="submit" className="btn btn-lg w-25" style={{
                                    background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', // Gradient blue color
                                    color: 'white',
                                    borderRadius: '12px',
                                    padding: '10px 0'
                                }}>Register</button>
                            </div>
                            {error && <div className="alert alert-danger mt-4 mb-0" role="alert">{message}</div>}
                            {(!error && message) && <div className="alert alert-success mt-4 mb-0" role="alert">{message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
