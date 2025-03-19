import React from 'react';
import { useState } from 'react';

const LoginModal = ({ show, handleClose }) => {
    const showHideClassName = show ? "modal show d-block" : "modal d-none";

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    
    return (
        <div className={showHideClassName} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg" style={{ borderRadius: '15px' }}>
                    <div className="modal-header" style={{ borderBottom: '1px solid #dee2e6' }}>
                        <h5 className="modal-title">Login</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter your username" style={{ borderRadius: '12px' }} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password" style={{ borderRadius: '12px' }} />
                            </div>
                            <div className="d-grid gap-2">
                                <div className="col-4 mx-auto">
                                    <button type="submit" className="btn btn-md w-100" style={{ backgroundColor: '#32CD32', color: 'white', borderRadius: '12px' }}>Log In</button>
                                </div>
                                {error && <div className="alert alert-danger mt-3" role="alert">{message}</div>
                                }
                                {(!error && message) && <div className="alert alert-success mt-3" role="alert">{message}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
