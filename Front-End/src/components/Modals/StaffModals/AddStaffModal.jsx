import React from 'react'
import { useState } from 'react'
import axios from 'axios';

function AddStaffModal({ salaryList, role, handleTriggerAPI, handleAddStaffModal }) {
  const [staff, setStaff] = useState({
    personalId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    birthday: "",
    contactNumber: "",
    address: "",
    specialty: "",
    qualification: "",
    salaryId: "",
    role: role,
  });

  const [emailExists, setEmailExists] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'firstName' || name === 'lastName') {
        updated.email = `${updated.firstName}${updated.lastName}@petclinic.com`.toLowerCase();
        updated.username = `${updated.firstName}.${updated.lastName}`.toLowerCase();
      }
      return updated;
    });
  };

  const handleDiscard = () => {
    setStaff({
      personalId: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      birthday: "",
      contactNumber: "",
      address: "",
      specialty: "",
      qualification: "",
      salaryId: "",
      role: role,
    });
    setEmailExists(false);
  };

const handleAddStaff = async () => {
  const requiredFields = ['personalId', 'firstName', 'lastName', 'birthday', 'contactNumber', 'address', 'username', 'password'];
  if (role.toLowerCase() === 'doctor') requiredFields.push('specialty', 'qualification');
  if (role.toLowerCase() === 'receptionist') requiredFields.push('qualification');

  const emptyFields = requiredFields.filter(field => !staff[field]);
  if (emptyFields.length > 0) return showMessage('Please fill in all required fields.', 'error');

  if (staff.password.length < 8) return showMessage('Password must be at least 8 characters long.', 'error');

  const matchedSalary = salaryList.find(s => {
    return role.toLowerCase() !== 'doctor'
      ? s.role.toLowerCase() === role.toLowerCase()
      : s.role.toLowerCase() === role.toLowerCase() && s.specialty === staff.specialty;
  });

  const finalStaff = {
    ...staff,
    personalId: parseInt(staff.personalId),
    salaryId: matchedSalary ? parseInt(matchedSalary.salaryId) : ''
  };

  try {
    const response = await axios.post('http://localhost:5067/api/Staff/addStaff', finalStaff);
    if (response.status === 201) {
      showMessage('Staff member added successfully!', 'success');

    }
  } catch (error) {
    console.error('Error adding staff:', error);
    if (error.response?.status === 409) {
      setEmailExists(true);
      return showMessage('This email is already taken. Please choose another.', 'danger');
    }
    return showMessage('An error occurred while adding the staff member. Please try again.', 'danger');
  }

        // Delay discard + API trigger slightly to allow user to see the message
      setTimeout(() => {
        handleTriggerAPI();
        handleDiscard();
      }, 1500);

};


const showMessage = (msg, type) => {
  setMessage(msg);
  setMessageType(type);
  setTimeout(() => {
    setMessage(null);
    setMessageType('');
  }, 3000);
};


  const filteredSalaries = salaryList.filter(salary => {
    if (role.toLowerCase() !== 'doctor') return salary.role.toLowerCase() === role.toLowerCase();
    return salary.role.toLowerCase() === role.toLowerCase() && salary.specialty === staff.specialty;
  });

  const uniqueSalaries = role.toLowerCase() === 'doctor' && staff.specialty === 'General Veterinary'
    ? [filteredSalaries.find(s => s.specialty === 'General Veterinary')].filter(Boolean)
    : filteredSalaries;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow border-0 rounded-4 bg-white">
          <div className="modal-header bg-gradient text-white" style={{ backgroundColor: '#5c6bc0' }}>
            <h5 className="modal-title">Add New {role} Staff Member</h5>
          </div>
          <div className="modal-body px-4 py-4">
            {message && (
              <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'}`} role="alert">
                {message}
              </div>
            )}
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" name="personalId" value={staff.personalId} onChange={handleChange} className="form-control form-control-lg" placeholder="Personal ID" />
              </div>
              <div className="col-md-6">
                <input type="text" name="firstName" value={staff.firstName} onChange={handleChange} className="form-control form-control-lg" placeholder="First Name" />
              </div>
              <div className="col-md-6">
                <input type="text" name="lastName" value={staff.lastName} onChange={handleChange} className="form-control form-control-lg" placeholder="Last Name" />
              </div>
              <div className="col-md-6">
                <input type="text" name="username" value={staff.username} onChange={handleChange} className="form-control form-control-lg" placeholder="Username" />
              </div>
              <div className="col-md-6">
                <input type="password" name="password" value={staff.password} onChange={handleChange} className="form-control form-control-lg" placeholder="Password" />
              </div>
              <div className="col-md-6">
                <input type="text" name="email" value={staff.email} onChange={handleChange} className={`form-control form-control-lg ${emailExists ? 'is-invalid' : ''}`} placeholder="Email" />
                {emailExists && <div className="invalid-feedback">This email is already taken. Please choose another.</div>}
              </div>
              <div className="col-md-6">
                <input type="date" name="birthday" value={staff.birthday} onChange={handleChange} className="form-control form-control-lg" placeholder="Birthday" />
              </div>
              <div className="col-md-6">
                <input type="text" name="contactNumber" value={staff.contactNumber} onChange={handleChange} className="form-control form-control-lg" placeholder="Contact Number" />
              </div>
              <div className="col-md-6">
                <input type="text" name="address" value={staff.address} onChange={handleChange} className="form-control form-control-lg" placeholder="Address" />
              </div>

              {(role.toLowerCase() === 'doctor' || role.toLowerCase() === 'receptionist') && (
                <div className="col-md-6">
                  <input type="text" name="qualification" value={staff.qualification} onChange={handleChange} className="form-control form-control-lg" placeholder="Qualification" />
                </div>
              )}

              {role.toLowerCase() === 'doctor' && (
                <div className="col-md-6">
                  <select name="specialty" value={staff.specialty} onChange={handleChange} className="form-select form-select-lg">
                    <option value="">Select Specialty</option>
                    <option value="General Veterinary">General Veterinary</option>
                    <option value="Surgery">Surgery</option>
                  </select>
                </div>
              )}

              <div className="col-md-12">
                <label className="form-label fw-semibold fs-6">Salary Details</label>
                <div className="p-3 border rounded bg-light">
                  {uniqueSalaries.length > 0 ? (
                    <ul className="mb-0 ps-3">
                      {uniqueSalaries.map((salary, index) => (
                        <li key={index} className="mb-1">
                          <strong>Base Salary:</strong> ${salary.baseSalary}, <strong>Overtime Rate:</strong> x{salary.overtimeRate}, <strong>Pay Cycle:</strong> {salary.payCycle}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No salary information available for this role.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={handleAddStaffModal}>Cancel</button>
            <button type="button" className="btn btn-outline-warning px-4 rounded-pill" onClick={handleDiscard}>Discard</button>
            <button type="button" className="btn btn-success px-4 rounded-pill" onClick={handleAddStaff}>Add Staff</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStaffModal;