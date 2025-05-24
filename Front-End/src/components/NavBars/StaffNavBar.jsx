import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../../utils/authUtils';

function StaffNavBar({ role }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      clearUserInfo();
      navigate("/", { replace: true });
    }
  };

  const normalizedRole = role?.toLowerCase().trim();

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
                <Link className="nav-link text-dark" to="/Pets-Staff">Pets</Link>
              </li>

              {/* Clients and Staff - Manager or Receptionist */}
              {(normalizedRole === 'manager' || normalizedRole === 'receptionist') && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/Clients-Staff">Clients</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/Staff">Staff</Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link className="nav-link text-dark" to="/Products">Inventory</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/Timetable-Staff">Timetable</Link>
              </li>

              {/* Insights - Only for Manager */}
              {normalizedRole === 'manager' && (
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/Insights-Staff">Insights</Link>
                </li>
              )}
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
  );
}

export default StaffNavBar;
