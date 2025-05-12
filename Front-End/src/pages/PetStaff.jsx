import ViewPetsStaff from '../components/PetsStaff/ViewPetsStaff';
import NavigationBar from '../components/NavBars/NavigationBar';
import React, { useEffect, useState } from 'react';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

function PetStaff() {

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
        <h2>Pets Page</h2>
        < ViewPetsStaff roleLoggedIn={role} />
      </div>
    </div>
    </div>
    );

}

export default PetStaff
