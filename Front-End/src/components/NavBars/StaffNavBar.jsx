import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../../utils/authUtils';

function StaffNavBar() {

    const navigate = useNavigate();

    const handleLogOut = () => {

       if(confirm("Are you sure you want to log out?")){
                // Clear user info
                clearUserInfo();
                // Redirect to login page
                navigate("/", {replace: true});
       }
       return;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white p-2 rounded-4 border border-2 border-black shadow-sm fixed-top m-3">
                <div className="container-fluid p-1">
                    <img
                        src="src/assets/navbar-logo.png"
                        alt="Nimbus' PawPals Logo"
                        style={{ maxWidth: "100px", width: "100px", height: "auto" }}
                    />

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-dark">Pets</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark">Clients</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/Staff" >Staff</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/Products">Inventory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark">Timetable</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark">Insights</Link>
                            </li>
                        </ul>
                        <div className="d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
                            <Link to="/Personal-Info" className='nav-link text-dark'>
                                <button className="btn btn-transparent nav-item nav-link me-4" type="button" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'inherit', boxShadow: 'none' }}>
                                    My Profile
                                </button>
                            </Link>
                            <button className="btn btn-outline-danger mb-2 mb-lg-0 me-lg-3" type="button" onClick={handleLogOut}>Log Out</button>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default StaffNavBar;
