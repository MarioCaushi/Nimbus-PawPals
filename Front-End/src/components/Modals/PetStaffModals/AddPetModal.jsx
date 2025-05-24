import React, { useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';

const AddPetModal = ({ show, handleClose, toggleAPIHandler }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    species: '',
    breed: '',
    color: '',
    gender: '',
    weight: '',
    allergyInfo: '',
    specialNeed: '',
    castrated: '',
    healthStatus: '',
    clientId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const discardChanges = () => {
    setFormData({
      name: '',
      birthday: '',
      species: '',
      breed: '',
      color: '',
      gender: '',
      weight: '',
      allergyInfo: '',
      specialNeed: '',
      castrated: '',
      healthStatus: '',
      clientId: ''
    });
  };

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleAddPet = async () => {
    // Check for empty fields
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter(key => formData[key] === '');
    if (emptyFields.length > 0) {
      setMessage('Please fill in all the fields.');
      setMessageType('error');

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }
      , 2000);
      return;
    }

    // Validate numeric fields
    const numericFields = ['weight', 'healthStatus', 'clientId'];
    for (const field of numericFields) {
      if (isNaN(formData[field])) {
        setMessage(`"${field}" must be a valid number.`);
        setMessageType('error');

        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }
        , 2000);
        return;
      }
    }

    // Clear previous messages
    setMessage('');
    setMessageType('');

    try {
      //  TODO: Add API logic here
      console.log('All fields valid. Ready to submit:', formData);

      const response = await axios.post('http://localhost:5067/api/Pet/addPet', formData);
      if (response.status == 200) {

        setMessage('Pet added successfully!');
        setMessageType('success');

        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 2000);

        discardChanges();
        toggleAPIHandler(); // Refresh the pet list after adding a new pet
      }
    } catch (error) {
      console.error('API error:', error);
      setMessage('An error occurred while adding the pet. Please try again.');
      setMessageType('error');
    }
  };


  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '20px', overflow: 'hidden' }}>

          {/* Header */}
          <div className="modal-header text-white" style={{ backgroundColor: '#81c784', borderBottom: 'none' }}>
            <h5 className="modal-title">🐾 Add New Pet</h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>

          {/* Form */}
          <div className="modal-body bg-light px-4 py-3">
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Birthday</label>
                <input type="date" name="birthday" className="form-control" value={formData.birthday} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Species</label>
                <input type="text" name="species" className="form-control" value={formData.species} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Breed</label>
                <input type="text" name="breed" className="form-control" value={formData.breed} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Color</label>
                <input type="text" name="color" className="form-control" value={formData.color} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Weight (kg)</label>
                <input type="number" step="0.1" name="weight" className="form-control" value={formData.weight} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Health Status (1–10)</label>
                <input type="number" min="1" max="10" name="healthStatus" className="form-control" value={formData.healthStatus} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Castrated</label>
                <select name="castrated" className="form-select" value={formData.castrated} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Client ID</label>
                <input type="number" name="clientId" className="form-control" value={formData.clientId} onChange={handleChange} />
              </div>

              <div className="col-12">
                <label className="form-label">Allergy Info</label>
                <input type="text" name="allergyInfo" className="form-control" value={formData.allergyInfo} onChange={handleChange} />
              </div>

              <div className="col-12">
                <label className="form-label">Special Needs</label>
                <input type="text" name="specialNeed" className="form-control" value={formData.specialNeed} onChange={handleChange} />
              </div>
            </form>

            {message && (
              <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'}`} role="alert">
                {message}
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="modal-footer justify-content-between px-4" style={{ backgroundColor: '#f1f8e9' }}>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-success rounded-pill px-4" onClick={handleAddPet}>➕ Add</button>
              <button className="btn btn-outline-warning rounded-pill px-4 text-dark" onClick={discardChanges}>❌ Discard</button>
            </div>
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={handleClose}>🔙 Close</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddPetModal;
