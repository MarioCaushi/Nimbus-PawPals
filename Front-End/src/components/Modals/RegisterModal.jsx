import React, { useState } from 'react';
import axios from "axios";

const RegisterModal = ({ show, handleClose, loggedIn, handleTrigger }) => {

    // Deals with the display of the modal
    const showHideClassName = show ? "modal show d-block" : "modal d-none";

    //Messages for the user
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    //Registration handling 

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const [communication, setCommunication] = useState("");
    const [address, setAddress] = useState("");

    // Function to deal with the submit of the registration form
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Check for empty fields first
        if (
            firstName.trim() === "" ||
            lastName.trim() === "" ||
            username.trim() === "" ||
            password.trim() === "" ||
            email.trim() === "" ||
            number.trim() === "" ||
            birthday.trim() === "" ||
            communication.trim() === "None" ||
            address.trim() === ""
        ) {
            setError(true);
            setMessage("Please fill in all the necessary fields!!!");

            setTimeout(() =>
                {
                    setError(false);
                    setMessage("");
                },5000);

            return; 
        }
    
        // Check password length
        if (password.trim().length <= 6) {
            setError(true);
            setMessage("Password must be longer than 6 characters.");

            setTimeout(() =>
            {
                setError(false);
                setMessage("");
            },5000);

            return;
        }
    
        // Calculate age from birthday and check if user is older than 16
        const birthdayDate = new Date(birthday);
        const age = getAge(birthdayDate);
        if (age < 16) {
            setError(true);
            setMessage("You must be at least 16 years old to register.");

            setTimeout(() =>
                {
                    setError(false);
                    setMessage("");
                },5000);

            return;
        }


        const register = {
            "Username": username,
            "Password": password,
            "FirstName": firstName,
            "LastName": lastName,
            "Birthday": formatDateForDotNet(birthdayDate),
            "Email": email,
            "ContactNumber": number,
            "Address": address,
            "PreferredContact": communication
        };

        try
        {
            const response = await axios.post("http://localhost:5067/api/Auth/register", register );

            if(response.status == 200)
                {
                    setError(false);
                    setMessage("Registered successfully... ");
        
                    setTimeout(() =>
                        {
                            setError(false);
                            setMessage("");
                        },2000);

                        resetForm();
                        handleTrigger();
                        return;
                }
        }
        catch(error)
        {
            setError(true);
            setMessage("Username/Email must be unique");

            setTimeout(() =>
                {
                    setError(false);
                    setMessage("");
                },5000);
        }

    };

    // Helper function to make the date in a dotnet appropriate format
    function formatDateForDotNet(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // JavaScript months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
    
    // Helper function to calculate age
    function getAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    
    // Helper function to reset all the states
    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setEmail("");
        setNumber("");
        setBirthday("");
        setCommunication("");
        setAddress("");
    };
    

    return (
        <div className={showHideClassName} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow-lg" style={{ borderRadius: '15px', border: 'none' }}>
                    <div className="modal-header" style={{ borderBottom: '2px solid #dee2e6', backgroundColor: '#f8f9fa' }}>
                        <h5 className="modal-title" style={{ fontSize: '1.5rem' }}>
                            {loggedIn ? "Add Client" : "Register"}
                        </h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ padding: '2rem' }}>
                        <form onSubmit={handleSubmit} >
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label" style={{ fontSize: '1.1rem' }}>First Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" style={{ borderRadius: '12px', fontSize: '1rem' }}
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label" style={{ fontSize: '1.1rem' }}>Last Name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" style={{ borderRadius: '12px', fontSize: '1rem' }}
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="username" className="form-label" style={{ fontSize: '1.1rem' }}>Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Choose a username" style={{ borderRadius: '12px', fontSize: '1rem' }}
                                        value={username}
                                        onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="password" className="form-label" style={{ fontSize: '1.1rem' }}>Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Create a password" style={{ borderRadius: '12px', fontSize: '1rem' }} 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label" style={{ fontSize: '1.1rem' }}>Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" style={{ borderRadius: '12px', fontSize: '1rem' }}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="contactNumber" className="form-label" style={{ fontSize: '1.1rem' }}>Contact Number</label>
                                    <input type="text" className="form-control" id="contactNumber" placeholder="Enter your contact number" style={{ borderRadius: '12px', fontSize: '1rem' }} 
                                    value = {number}
                                    onChange={e => setNumber(e.target.value)}/>
                                </div>
                            </div>
                            <div className="row m-2 mb-3">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="birthday" className="form-label" style={{ fontSize: '1.1rem' }}>Birthday</label>
                                    <input type="date" className="form-control" id="birthday" style={{ borderRadius: '12px', fontSize: '1rem' }} 
                                    value ={birthday}
                                    onChange={e => setBirthday(e.target.value)}/>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="preferredCommunication" className="form-label" style={{ fontSize: '1.1rem' }}>Preferred Communication</label>
                                    <select className="form-select" id="preferredCommunication" style={{ borderRadius: '12px', fontSize: '1rem' }}
                                    value={communication}
                                    onChange={e => setCommunication(e.target.value)}>
                                        <option value="None"> Choose: </option>
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-5 m-2">
                                <label htmlFor="address" className="form-label" style={{ fontSize: '1.1rem' }}>Address</label>
                                <input type="text" className="form-control" id="address" placeholder="Enter your address" style={{ borderRadius: '12px', fontSize: '1rem' }} 
                                value={address}
                                onChange={e => setAddress(e.target.value)}/>
                            </div>

                            <div className="d-flex gap-2 align-items-center justify-content-center">
                                <button type="submit" className="btn btn-lg w-25" style={{
                                    background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                                    color: 'white',
                                    borderRadius: '12px',
                                    padding: '10px 0'
                                }}>
                                    {loggedIn ? "Add Client" : "Register"}
                                </button>

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
