import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ViewDetailsModal = ({ data, onClose, handleTriggerAPI, handleEditModal, triggerAPI }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    userInfoAPI();
  }, [triggerAPI]);

  const userInfoAPI = async () => {
    try {
      const response = await axios.post('http://localhost:5067/api/User/staff', data);

      if (response.status === 200 && response.data) {
        const staffData = response.data;
        const roleObject = staffData[data.role.toLowerCase()] || {};

        const combinedData = {
          username: staffData.username,
          password: staffData.password,
          baseSalary: staffData.baseSalary,
          overtimeRate: staffData.overtimeRate,
          role: data.role.toLowerCase()
        };

        for (const key in roleObject) {
          let value = roleObject[key];
          if (typeof value === 'string' && value.includes('T') && !isNaN(Date.parse(value))) {
            value = value.split('T')[0];
          }
          if (value !== null && value !== undefined && value !== '') {
            combinedData[key] = value;
          }
        }

        delete combinedData.userAuths;
        delete combinedData.salaryId;

        setUserData(combinedData);

      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleDelete = async () => {

    console.log('Deleting user with data:', data);

    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await axios.delete('http://localhost:5067/api/User/delete', {
        headers: { 'Content-Type': 'application/json' },
        data: {
          role: data.role,
          roleId: data.roleId 
        }
      });

      if (response.status === 200) {
        console.log('User deleted successfully');
        handleTriggerAPI();
        onClose();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow border-0 rounded-4" style={{ backgroundColor: '#fefefe' }}>
          <div className="modal-header bg-light border-bottom">
            <h5 className="modal-title fw-semibold text-secondary">Staff Member Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div
            className="modal-body px-4 py-3"
            style={{ maxHeight: '60vh', overflowY: 'auto' }}
          >
            <div className="row g-3">
              {Object.entries(userData).map(([key, value]) => (
                <div className="col-sm-12 col-md-6" key={key}>
                  <div className="border rounded-3 p-2 bg-white h-100">
                    <h6 className="text-muted small mb-1 fw-semibold">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}
                    </h6>
                    <p className="mb-0 text-dark fw-normal" style={{ fontSize: '0.875rem' }}>
                      {String(value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer bg-light d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn px-4 rounded-pill"
              style={{
                border: '2px solid #f06292',
                color: '#f06292',
                backgroundColor: 'white',
              }}
              onMouseOver={e => {
                e.target.style.backgroundColor = '#fce4ec';
                e.target.style.color = '#c2185b';
              }}
              onMouseOut={e => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#f06292';
              }}
              onClick={() => handleDelete()}
            >
              🗑️ Delete
            </button>
            <button
              type="button"
              className="btn px-4 rounded-pill"
              style={{
                border: '2px solid #66bb6a',
                color: '#388e3c',
                backgroundColor: 'white',
              }}
              onMouseOver={e => {
                e.target.style.backgroundColor = '#e8f5e9';
                e.target.style.color = '#1b5e20';
              }}
              onMouseOut={e => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#388e3c';
              }}
              onClick={() => handleEditModal(userData)}
            >
              ✏️ Edit
            </button>
            <button
              type="button"
              className="btn px-4 rounded-pill"
              style={{
                border: '2px solid #9e9e9e',
                color: '#424242',
                backgroundColor: 'white',
              }}
              onMouseOver={e => {
                e.target.style.backgroundColor = '#eeeeee';
              }}
              onMouseOut={e => {
                e.target.style.backgroundColor = 'white';
              }}
              onClick={onClose}
            >
              ✖️ Close
            </button>
          </div>


        </div>
      </div>
    </div>


  );
};

export default ViewDetailsModal;
