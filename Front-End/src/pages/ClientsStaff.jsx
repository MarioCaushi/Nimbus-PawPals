import React from 'react'
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavBars/NavigationBar'
import ViewClients from '../components/ClientStaff/ViewClients'

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

function ClientsStaff() {

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
    <div>
     <div style={{ marginTop: '80px' }}>  {/* ⬅️ Increase or decrease as needed */}
      <NavigationBar loggedIn={loggedIn} role={role} />
      <div className="container mt-5">
        <h2>Client Page</h2>
        <ViewClients roleLoggedIn={role} loggedIn={loggedIn} />
      </div>
    </div>
    </div>
  )
}

export default ClientsStaff
