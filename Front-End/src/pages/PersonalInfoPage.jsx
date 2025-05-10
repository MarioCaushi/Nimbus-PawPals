import React from 'react';
import NavigationBar from '../components/NavBars/NavigationBar';
import ViewPersonalInfo from '../components/PersonalInfo/ViewPersonalInfo';
import EditPersonalInfo from '../components/PersonalInfo/EditPersonalInfo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../utils/authUtils';


const PersonalInfo = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    const [userData, setUserData] = useState({});

  
  useEffect(() => {

    const userInfo = getUserInfo();

    if (userInfo.isLoggedIn) {
      setLoggedIn(true);
      setRole(userInfo.role);
      setUserId(userInfo.userId);
    } else {
      setLoggedIn(false);
      setRole('');
      setUserId('');
    }

  }, []);

  useEffect(() => {
  if (loggedIn && role && userId) {
    userInfoAPI();
  }
}, [loggedIn, role, userId]);

  // Function to fetch user info based on role and userId
const userInfoAPI = async () => {
  const userInfo = {
    role: role,
    roleId: userId
  };

  try {
    const response = await axios.post('http://localhost:5067/api/User/staff', userInfo);

    if (response.status === 200 && response.data) {
      const data = response.data;

      // Get role-specific object (e.g., data.manager)
      const roleObject = data[role.toLowerCase()] || {};

      // Combine top-level fields
      const combinedData = {
        username: data.username,
        password: data.password,
        baseSalary: data.baseSalary,
        overtimeRate: data.overtimeRate,
        role: role
      };

      // Add only non-null fields from the role-specific object
      for (const key in roleObject) {
        let value = roleObject[key];

        // If value is an ISO date, format to YYYY-MM-DD
        if (typeof value === 'string' && value.includes('T') && !isNaN(Date.parse(value))) {
          value = value.split('T')[0]; // keep only the date part
        }

        if (value !== null && value !== undefined && value !== '') {
          combinedData[key] = value;
        }
      }

      // Explicitly remove unwanted fields
      delete combinedData.userAuths;
      delete combinedData.salaryId;

      setUserData(combinedData);
      console.log('Cleaned User Data:', combinedData);
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
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

        {editMode ? <EditPersonalInfo userInfo={userData} /> : <ViewPersonalInfo userInfo={userData} />}
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
