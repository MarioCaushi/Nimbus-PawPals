import React from 'react';
import NavigationBar from '../components/NavBars/NavigationBar';
import ViewPersonalInfo from '../components/PersonalInfo/ViewPersonalInfo';
import EditPersonalInfo from '../components/PersonalInfo/EditPersonalInfo';
import { useState, useEffect } from 'react';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

const PersonalInfo = () => {

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

  // Simulated user data
  const userInfo = {
    role: "Manager",
    managerID: "MGR001",
    personalID: "P123456",
    hireDate: "2010-06-01",
    name: "John",
    lastName: "Doe",
    birthday: "1980-04-22",
    address: "1234 Elm Street, Suburbia, ST 12345",
    email: "john.doe@example.com",
    contactNumber: "+1 234-567-8901"
  };

  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(prev => !prev);
  }
  
  return (
    <div>
      <NavigationBar loggedIn={loggedIn} role={role} />
      <div style={{ height: '50px', visibility: 'hidden' }}>Spacer</div>
      <div className="container-fluid">
        <h2 className='mt-3 mb-0'>Personal Info</h2>

        {editMode ? <EditPersonalInfo userInfo={userInfo} /> : <ViewPersonalInfo userInfo={userInfo} />}
        <button
          className="btn btn-light mt-0" // Using 'btn-light' for a soft appearance on the pink background
          type="button"
          style={{
            borderColor: '#ff80ab', // Soft pink border for a touch of color
            color: '#ff80ab', // Soft pink text to harmonize with the pink background
            transition: 'background-color 0.3s, color 0.3s', // Smooth transitions for hover effects
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ff80ab'; // Darker pink on hover for text visibility
            e.currentTarget.style.color = 'white'; // Text color changes to white on hover for contrast
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = ''; // Revert to original on mouse out
            e.currentTarget.style.color = '#ff80ab'; // Text color reverts to soft pink
          }}

          onClick={handleEdit} // Call handleEdit function on click
        >
          {editMode ? 'View Info' : 'Edit'}
        </button>


      </div>
    </div>
  )
}

export default PersonalInfo;
