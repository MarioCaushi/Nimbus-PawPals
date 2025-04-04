import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../utils/authUtils';



const LoginModal = ({ show, handleClose }) => {
    const showHideClassName = show ? "modal show d-block" : "modal d-none";

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const reset =()=> {
        setUsername("");
        setPassword("");
        setError(false);
        setMessage("");
    }

    const handleModalClose = () => {
        reset();       
        handleClose();  
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setError(true);
            setMessage("Please fill in all fields");
        } else {

            loginAuth();

            reset();
        }
    };

    const loginAuth = async () => {
        try {
            const response = await axios.post('http://localhost:5067/api/Auth/login', {
               "username": username,
               "password": password
            });
            if (response.status === 200) {

                console.log(response.data);
                setUserInfo(response.data.roleId, response.data.role);
                setError(false);
                setMessage("Login successful");

                setTimeout(() => {
                    setMessage("");
                    setError(false);
                    handleModalClose();
                    navigate('/Personal-Info');
                }
                , 1000);

            }
        } catch (error) {
            setError(true);
            setMessage("Invalid credentials");
        }
    };

    
    return (
        <div className={showHideClassName} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg" style={{ borderRadius: '15px' }}>
                    <div className="modal-header" style={{ borderBottom: '1px solid #dee2e6' }}>
                        <h5 className="modal-title">Login</h5>
                        <button type="button" className="btn-close" onClick={handleModalClose}  aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter your username" style={{ borderRadius: '12px' }} 
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password" style={{ borderRadius: '12px' }} 
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
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
