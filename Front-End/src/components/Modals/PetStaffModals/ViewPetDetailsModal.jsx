import React, { useState } from 'react';

function ViewPetDetailsModal({ show, handleClose, pet, handleEditClick, roleLoggedIn }) {
  const [activeTab, setActiveTab] = useState('info');

  if (!show || !pet) return null;

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
  const [newRecord, setNewRecord] = useState({ date: '', description: '' });

  const handleAddMedicalRecord = () => {
    if (!newRecord.date || !newRecord.description) return;
    medicalCharts.push({
      date: newRecord.date,
      description: newRecord.description,
      petId: pet.petId
    });
    setShowAddMedicalModal(false);
    setNewRecord({ date: '', description: '' });
  };


  const emoji = speciesEmoji[pet.species] || speciesEmoji.default;

  // Mock data for medical charts and appointments
  const medicalCharts = [
    {
      medicalChartId: 101,
      description: 'Routine vaccination and general check-up. All vital signs normal.',
      date: '2023-06-15',
      petId: pet.petId
    },
    {
      medicalChartId: 102,
      description: 'Treatment for mild ear infection. Prescribed antibiotics.',
      date: '2023-09-01',
      petId: pet.petId
    },
    {
      medicalChartId: 103,
      description: 'Dental cleaning. Observed minor tartar buildup.',
      date: '2024-01-10',
      petId: pet.petId
    },
    {
      medicalChartId: 104,
      description: 'Skin allergy treatment. Applied topical medication.',
      date: '2024-03-22',
      petId: pet.petId
    }
  ];

  const appointmentRecords = [
    {
      appointmentId: 201,
      startTime: '2023-04-18T10:00:00',
      endTime: '2023-04-18T10:30:00',
      description: 'Annual physical exam',
      status: 'Completed',
      petId: pet.petId,
      serviceType: 'Checkup',
      serviceName: 'Full Physical Check'
    },
    {
      appointmentId: 202,
      startTime: '2023-06-22T15:00:00',
      endTime: '2023-06-22T15:15:00',
      description: 'Rabies vaccination',
      status: 'Completed',
      petId: pet.petId,
      serviceType: 'Vaccination',
      serviceName: 'Rabies Shot'
    },
    {
      appointmentId: 203,
      startTime: '2024-01-10T09:00:00',
      endTime: '2024-01-10T09:45:00',
      description: 'Dental cleaning procedure',
      status: 'Completed',
      petId: pet.petId,
      serviceType: 'Dental',
      serviceName: 'Teeth Cleaning'
    },
    {
      appointmentId: 204,
      startTime: '2024-03-14T13:30:00',
      endTime: '2024-03-14T14:00:00',
      description: 'Grooming session - nails and fur',
      status: 'Scheduled',
      petId: pet.petId,
      serviceType: 'Grooming',
      serviceName: 'Basic Grooming'
    }
  ];

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
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => setShowAddMedicalModal(true)}
              >
                ➕ Add Record
              </button>
            </div>
            {medicalCharts.map((chart) => (
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
            ))}
          </div>
        );

      case 'appointments':
        return (
          <div className="py-3 px-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {appointmentRecords.map((appt) => (
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
            ))}
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

                {['Manager', 'Receptionist'].includes(roleLoggedIn?.toLowerCase().trim().charAt(0).toUpperCase() + roleLoggedIn?.toLowerCase().trim().slice(1)) && (
              <button className="btn btn-outline-warning rounded-pill px-4 text-dark" onClick={handleEditClick}>
                ✏️ Edit
              </button>
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
            <textarea className="form-control" rows={3} value={newRecord.description} onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}></textarea>
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
