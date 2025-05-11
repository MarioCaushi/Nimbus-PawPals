import React from 'react'
import ViewStaff from '../components/Staff/ViewStaff'
import NavigationBar from '../components/NavBars/NavigationBar'
import { useState, useEffect } from 'react';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

const StaffPage = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem(LOGGED_IN_KEY);
    const savedRole = localStorage.getItem(ROLE_KEY); // Renamed to avoid shadowing
    if (token) {
      setLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  return (
    <div style={{ marginTop: '80px' }}>  {/* ⬅️ Increase or decrease as needed */}
      <NavigationBar loggedIn={loggedIn} role={role} />
      <div className="container mt-5">
        <h2>Staff Page</h2>
        <ViewStaff roleLoggedIn={role} />
      </div>
    </div>

  )
}

export default StaffPage
