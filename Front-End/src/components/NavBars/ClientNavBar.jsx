import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../../utils/authUtils';
import { FaShoppingCart } from 'react-icons/fa';

function ClientNavBar({ role }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      clearUserInfo();
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-3 rounded-4 border border-2 border-black shadow-sm fixed-top m-3">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand">
          <img
            src="src/assets/navbar-logo.png"
            alt="Nimbus' PawPals Logo"
            style={{ width: "100px", height: "auto" }}
          />
        </Link>

        {/* Navbar toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/Pets">My Pets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold">Inventory</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/Timetable">Timetable</Link>
            </li>
          </ul>

          {/* Right-side Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart Icon with Badge */}
            <Link to="" className="position-relative">
              <FaShoppingCart size={20} className="text-dark" />
              {/* Badge placeholder - set item count here */}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </Link>

            {/* Profile Button */}
            <Link to="/Client-Personal-Info">
              <button className="btn btn-outline-primary fw-semibold">
                My Profile
              </button>
            </Link>

            {/* Logout */}
            <button className="btn btn-danger fw-semibold" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ClientNavBar;
