import ViewPetsStaff from '../components/PetsStaff/ViewPetsStaff';
import NavigationBar from '../components/NavBars/NavigationBar';
import React, { useEffect, useState } from 'react';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';
const USER_ID_KEY = 'userId';

function PetStaff() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem(LOGGED_IN_KEY);
        const savedRole = localStorage.getItem(ROLE_KEY); // Renamed to avoid shadowing
        const savedUserId = localStorage.getItem(USER_ID_KEY);

        console.log('Token:', token);
        console.log('Role:', savedRole);
        console.log('User ID:', savedUserId);

        if (token) {
            setLoggedIn(true);
            setRole(savedRole);
            setUserId(savedUserId);
        }
    }, []);

    return (
        <div>
            <div style={{ marginTop: '80px' }}>  {/* ⬅️ Increase or decrease as needed */}
                <NavigationBar loggedIn={loggedIn} role={role} />
                <div className="container mt-5">
                    {role && userId ? (
                        <>
                            <h2>
                                {role.toLowerCase() === 'client' ? 'My Pets' : 'Pets Page'}
                            </h2>
                            <p className="text-muted">
                                {role.toLowerCase() === 'client' ? 'View and manage your pets' : 'View and manage all pets'}
                            </p>
                            <ViewPetsStaff roleLoggedIn={role} userId={userId} />
                        </>
                    ) : (
                        <p className="text-muted">User information not loaded.</p>
                    )}

                </div>
            </div>
        </div>
    );

}

export default PetStaff
