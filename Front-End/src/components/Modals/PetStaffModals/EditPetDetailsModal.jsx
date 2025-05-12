import React, { useState, useEffect } from 'react';

function EditPetDetailsModal({ show, handleClose, pet }) {

  const [formData, setFormData] = useState({
    color: '',
    gender: '',
    birthday: '',
    weight: '',
    specialNeed: '',
    healthStatus: '',
    allergyInfo: '',
    castrated: ''
  });

  useEffect(() => {
    if (pet) {
      setFormData({
        color: pet.color || '',
        gender: pet.gender || '',
        birthday: pet.birthday || '',
        weight: pet.weight || '',
        specialNeed: pet.specialNeed || '',
        healthStatus: pet.healthStatus || '',
        allergyInfo: pet.allergyInfo || '',
        castrated: pet.castrated !== undefined ? pet.castrated.toString() : ''
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const discardChanges = () => {
    if (pet) {
      setFormData({
        color: pet.color || '',
        gender: pet.gender || '',
        birthday: pet.birthday || '',
        weight: pet.weight || '',
        specialNeed: pet.specialNeed || '',
        healthStatus: pet.healthStatus || '',
        allergyInfo: pet.allergyInfo || '',
        castrated: pet.castrated !== undefined ? pet.castrated.toString() : ''
      });
    }
  };

  if (!show || !pet) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '20px', overflow: 'hidden' }}>

          {/* Header */}
          <div className="modal-header text-white" style={{ backgroundColor: '#64b5f6', borderBottom: 'none' }}>
            <h5 className="modal-title">✏️ Edit {pet.name}'s Details</h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>

          {/* Form Body */}
          <div className="modal-body bg-light px-4 py-3">
            <form className="row g-3">
              <div className="col-6">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  className="form-control"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>

              <div className="col-6">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-6">
                <label className="form-label">Birthday</label>
                <input
                  type="date"
                  className="form-control"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </div>

              <div className="col-6">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Special Needs</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialNeed"
                  value={formData.specialNeed}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Health Status (1–10)</label>
                <input
                  type="number"
                  className="form-control"
                  name="healthStatus"
                  min="1"
                  max="10"
                  value={formData.healthStatus}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Allergies</label>
                <input
                  type="text"
                  className="form-control"
                  name="allergyInfo"
                  value={formData.allergyInfo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Castrated</label>
                <select
                  className="form-select"
                  name="castrated"
                  value={formData.castrated}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </form>
          </div>

          {/* Footer Buttons */}
          <div className="modal-footer justify-content-between px-4" style={{ backgroundColor: '#f8f9fc' }}>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-success rounded-pill px-4">
                ✅ Save
              </button>
              <button className="btn btn-outline-warning rounded-pill px-4 text-dark" onClick={discardChanges}>
                ❌ Discard
              </button>
            </div>
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={handleClose}>
              🔙 Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditPetDetailsModal;
