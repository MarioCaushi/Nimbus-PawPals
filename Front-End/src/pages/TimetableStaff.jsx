import React from 'react'
import NavigationBar from '../components/NavBars/NavigationBar'
import ViewTimetableStaff from '../components/TimetableStaff/ViewTimetableStaff'  
import { useState, useEffect } from 'react';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

const TimetableStaff = () => {

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
        <h2>Timetable Staff Page</h2>
        <ViewTimetableStaff roleLoggedIn={role} />
      </div>
    </div>
  )
}

export default TimetableStaff;
