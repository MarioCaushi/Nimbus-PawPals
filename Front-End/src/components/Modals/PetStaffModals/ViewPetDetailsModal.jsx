import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewPetDetailsModal({ show, handleClose, pet, handleEditClick, roleLoggedIn, toggleAPIHandler, userId }) {
  const [activeTab, setActiveTab] = useState('info');

  if (!show || !pet) return null;

  const handledDeleteClick = async () => {
    if (window.confirm(`Are you sure you want to delete ${pet.name}? This action cannot be undone.`)) {
      try {
        const response = await axios.delete(`http://localhost:5067/api/Pet/${pet.petId}`);
        if (response.status === 200) {
          console.log("Pet deleted successfully:", response.data);
          handleClose(); // Close the modal after deletion
          toggleAPIHandler();

        } else {
          console.error("Error deleting pet:", response.statusText);
        }
      } catch (error) {
        console.error("API error while deleting pet:", error);
        alert("An error occurred while deleting the pet. Please try again.");
      }
    }
  };

  const speciesEmoji = {
    Dog: '🐶',
    Cat: '🐱',
    Hamster: '🐹',
    Bird: '🐦',
    Rabbit: '🐰',
    Snake: '🐍',
    default: '🐾'
  };

  const [showAddMedicalModal, setShowAddMedicalModal] = useState(false);
  const [newRecord, setNewRecord] = useState({ date: '', description: '', petId: pet.petId });
  const [recordError, setRecordError] = useState('');
  const [recordSuccess, setRecordSuccess] = useState('');
  const [toggleAPI, setToggleAPI] = useState(false);


  const handleToggleAPI = () => {
    setToggleAPI(!toggleAPI);
  };

const handleAddMedicalRecord = async () => {
  if (!newRecord.date || !newRecord.description) {
    setRecordError('Please fill in both fields before adding.');
    setRecordSuccess('');
    setTimeout(() => setRecordError(''), 2000);
    return;
  }

  try {
    const response = await axios.post(`http://localhost:5067/api/Pet/medical-chart`, newRecord);
    if (response.status === 200) {
      console.log("Medical record added successfully:", response.data);
      setRecordError('');
      setRecordSuccess('Medical record added successfully!');
      
      setTimeout(() => {
        setRecordSuccess('');
        setShowAddMedicalModal(false);
        setNewRecord({ date: '', description: '', petId: pet.petId });
        handleToggleAPI(); // Refresh records
      }, 2000);
    }
  } catch (error) {
    console.error("API error while adding medical record:", error);
    setRecordError("An error occurred. Please try again.");
    setRecordSuccess('');
    setTimeout(() => setRecordError(''), 2000);
  }
};


  const emoji = speciesEmoji[pet.species] || speciesEmoji.default;

  const [appointmentError, setAppointmentError] = useState('');
  const [medicalError, setMedicalError] = useState('');


  const [medicalCharts, setMedicalCharts] = useState([]);

  const getMedicalAPI = async () => {
    try {
      const response = await axios.get(`http://localhost:5067/api/Pet/${pet.petId}/medical-records`);
      if (response.status === 200) {
        setMedicalCharts(response.data);
        setMedicalError('');
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
      if (error.response?.status === 404) {
        setMedicalError('No medical records available for this pet.');
      } else {
        setMedicalError('An error occurred while fetching medical records. Please try again later.');
      }
    }
  };



  const [appointmentRecords, setAppointmentRecords] = useState([]);

  const getAppointmentAPI = async () => {
    try {
      const response = await axios.get(`http://localhost:5067/api/Pet/${pet.petId}/appointments`);
      if (response.status === 200) {
        setAppointmentRecords(response.data);
        setAppointmentError('');
      }
    } catch (error) {
      console.error('Error fetching appointment records:', error);
      if (error.response?.status === 404) {
        setAppointmentError('No appointment records available for this pet.');
      } else {
        setAppointmentError('An error occurred while fetching appointments. Please try again later.');
      }
    }
  };



  useEffect(() => {
    getMedicalAPI();
    getAppointmentAPI();
  }, [toggleAPI]);


  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div>
            <div className="text-center mb-3">
              <div className="rounded-circle mx-auto" style={{
                backgroundColor: '#fff',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                {emoji}
              </div>
              <h6 className="mt-3 mb-1" style={{ fontWeight: '600' }}>{pet.name}</h6>
              <small className="text-muted">{pet.breed} ({pet.species})</small>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6"><strong>ID:</strong> {pet.petId}</div>
              <div className="col-6"><strong>Color:</strong> {pet.color}</div>
              <div className="col-6"><strong>Gender:</strong> {pet.gender}</div>
              <div className="col-6"><strong>Birthday:</strong> {pet.birthday}</div>
              <div className="col-6"><strong>Weight:</strong> {pet.weight} kg</div>
              <div className="col-6"><strong>Castrated:</strong> {pet.castrated ? 'Yes' : 'No'}</div>
              <div className="col-6"><strong>Allergies:</strong> {pet.allergyInfo}</div>
              <div className="col-6"><strong>Special Needs:</strong> {pet.specialNeed}</div>
              <div className="col-6"><strong>Health:</strong> {pet.healthStatus}/10</div>
              <div className="col-6"><strong>Registered:</strong> {new Date(pet.registerDate).toLocaleDateString()}</div>
              <div className="col-12 mt-2"><strong>Owner:</strong> {pet.clientName} (ID: {pet.clientId})</div>
            </div>
          </div>
        );

      case 'medical':
        return (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="text-end mb-2">
{roleLoggedIn?.toLowerCase() !== 'client' && (
  <button
    className="btn btn-sm btn-outline-success"
    onClick={() => setShowAddMedicalModal(true)}
  >
    ➕ Add Record
  </button>
)}
            </div>
            {medicalError ? (
              <div className="text-muted text-center">{medicalError}</div>
            ) : (
              medicalCharts.map((chart) => (
                <div
                  key={chart.medicalChartId}
                  className="p-3 mb-3 rounded"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    borderLeft: '5px solid #64b5f6'
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <strong># {chart.medicalChartId}</strong>
                    <small className="text-muted">{new Date(chart.date).toLocaleDateString()}</small>
                  </div>
                  <div className="mt-2 text-secondary" style={{ fontSize: '0.9rem' }}>
                    {chart.description}
                  </div>
                </div>
              ))
            )}
          </div>
        );


      case 'appointments':
        return (
          <div className="py-3 px-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {appointmentError ? (
              <div className="text-muted text-center">{appointmentError}</div>
            ) : (
              appointmentRecords.map((appt) => (
                <div
                  key={appt.appointmentId}
                  className="p-3 mb-3 rounded"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    borderLeft: '5px solid #9575cd'
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <strong># {appt.appointmentId}</strong>
                    <small className="text-muted">{new Date(appt.startTime).toLocaleDateString()}</small>
                  </div>
                  <div className="text-secondary mt-1" style={{ fontSize: '0.9rem' }}>
                    <div><strong>Service:</strong> {appt.serviceName} ({appt.serviceType})</div>
                    <div><strong>Time:</strong> {appt.startTime.slice(11, 16)} - {appt.endTime.slice(11, 16)}</div>
                    <div><strong>Status:</strong> {appt.status}</div>
                    <div><strong>Notes:</strong> {appt.description}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '20px', overflow: 'hidden' }}>

          {/* Header */}
          <div className="modal-header text-white" style={{ backgroundColor: '#f06292', borderBottom: 'none' }}>
            <h5 className="modal-title">
              {emoji} <strong>{pet.name}</strong>
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>

          {/* Tab Buttons */}
          <div className="d-flex justify-content-center gap-2 py-2" style={{ backgroundColor: '#f8f9fc' }}>
            <button
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'info' ? 'btn-primary text-white' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('info')}
            >
              Personal Info
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'medical' ? 'btn-primary text-white' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('medical')}
            >
              Medical Records
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'appointments' ? 'btn-primary text-white' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body bg-light px-4 py-3">
            {renderTabContent()}
          </div>

          {/* Footer Buttons */}
          <div className="modal-footer justify-content-between px-4" style={{ backgroundColor: '#f8f9fc', borderTop: 'none' }}>
            <div className="d-flex gap-2">
              {['Manager', 'Receptionist'].includes(
                roleLoggedIn?.toLowerCase().trim().charAt(0).toUpperCase() + roleLoggedIn?.toLowerCase().trim().slice(1)
              ) && (
                  <>
                    <button className="btn btn-outline-warning rounded-pill px-4 text-dark" onClick={handleEditClick}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-outline-danger rounded-pill px-4 text-dark" onClick={handledDeleteClick}>
                      🗑️ Delete
                    </button>
                  </>
                )}
            </div>

            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={handleClose}>
              ❌ Close
            </button>
          </div>

        </div>
      </div>

      {showAddMedicalModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '15px' }}>
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Medical Record</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddMedicalModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" value={newRecord.date} onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                  ></textarea>
                  {recordError && (
                    <div className="form-text text-danger mt-2">
                      {recordError}
                    </div>
                  )}
                  {recordSuccess && (
                    <div className="form-text text-success mt-2">
                      {recordSuccess}
                    </div>
                  )}
                </div>


              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-danger" onClick={() => setNewRecord({ date: '', description: '' })}>Discard</button>
                <button className="btn btn-success" onClick={handleAddMedicalRecord}>Add</button>
                <button className="btn btn-secondary" onClick={() => setShowAddMedicalModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ViewPetDetailsModal;
