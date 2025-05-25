import React, { useState } from 'react';
import axios from 'axios';

const AddAppointment = ({ toggleModal, roleLoggedIn, userId, toggleTrigger }) => {
  const [step, setStep] = useState(1);
  const [clientIdInput, setClientIdInput] = useState('');
  const [clientData, setClientData] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    description: ''
  });
  const [showSummary, setShowSummary] = useState(false);
  const [appointmentSummary, setAppointmentSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchClient = async () => {
    setErrorMessage('');
    if (!clientIdInput) {
      setErrorMessage('Please enter a Client ID.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5067/api/Client/${clientIdInput}`);
      setClientData(response.data);
      setStep(2);
    } catch (error) {
      setErrorMessage('Client not found. Please check the ID.');
    }
  };

  const fetchServices = async () => {
    setErrorMessage('');
    if (!selectedPetId) {
      setErrorMessage('Please select a pet.');
      return;
    }
    try {
      const response = await axios.get("http://localhost:5067/api/Services");
      setServices(response.data);
      setStep(3);
    } catch (error) {
      setErrorMessage('Error fetching services.');
    }
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setErrorMessage('');
    if (!formData.startTime) {
      setErrorMessage('Start time is required.');
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMessage('Please select at least one service.');
      return;
    }

    const selectedServiceDetails = services.filter(s => selectedServices.includes(s.serviceId));
    const totalDuration = selectedServiceDetails.reduce((sum, s) => sum + s.estimatedDuration, 0);
    const totalPrice = selectedServiceDetails.reduce((sum, s) => sum + s.price, 0);
    const endTime = new Date(new Date(formData.startTime).getTime() + totalDuration * 60000);

    const summary = {
      clientId: clientData.clientId,
      fullName: `${clientData.firstName} ${clientData.lastName}`,
      email: clientData.email,
      pet: clientData.pets.find(p => p.petId === selectedPetId),
      services: selectedServiceDetails,
      startTime: formData.startTime,
      endTime: endTime.toISOString(),
      description: formData.description || 'None',
      paymentMethod,
      totalPrice
    };

    setAppointmentSummary(summary);
    setShowSummary(true);
  };

  const confirmAppointment = async () => {
    const dto = {
      startTime: appointmentSummary.startTime,
      endTime: appointmentSummary.endTime,
      description: appointmentSummary.description,
      status: roleLoggedIn === 'Manager' || roleLoggedIn === 'Receptionist' ? 'Confirmed' : 'Pending',
      petId: appointmentSummary.pet.petId,
      serviceId: appointmentSummary.services.map(s => s.serviceId),
      clientId: appointmentSummary.clientId,
      paymentMethod: appointmentSummary.paymentMethod,
      totalAmount: appointmentSummary.totalPrice
    };

    try {
      await axios.post('http://localhost:5067/api/Timetable/addTimetable', dto);
      toggleTrigger();
      toggleModal();
    } catch (error) {
      console.error('Failed to add appointment:', error);
      setErrorMessage('Failed to save appointment. Please try again.');
    }
  };

  const renderSummaryModal = () => (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Appointment Summary</h5>
            <button type="button" className="btn-close" onClick={() => setShowSummary(false)}></button>
          </div>
          <div className="modal-body">
            <p><strong>Client ID:</strong> {appointmentSummary.clientId}</p>
            <p><strong>Full Name:</strong> {appointmentSummary.fullName}</p>
            <p><strong>Email:</strong> {appointmentSummary.email}</p>
            <p><strong>Pet:</strong> {appointmentSummary.pet.name} ({appointmentSummary.pet.breed})</p>
            <hr />
            <p><strong>Services:</strong></p>
            <ul className="list-group mb-3">
              {appointmentSummary.services.map(s => (
                <li key={s.serviceId} className="list-group-item d-flex justify-content-between align-items-center">
                  {s.serviceName}
                  <span>${s.price} / {s.estimatedDuration} min</span>
                </li>
              ))}
            </ul>
            <p><strong>Start Time:</strong> {new Date(appointmentSummary.startTime).toLocaleString()}</p>
            <p><strong>End Time:</strong> {new Date(appointmentSummary.endTime).toLocaleString()}</p>
            <p><strong>Description:</strong> {appointmentSummary.description || 'None'}</p>
            <p><strong>Payment Method:</strong> {appointmentSummary.paymentMethod}</p>
            <hr />
            <p className="fw-bold text-end fs-5">Total: ${appointmentSummary.totalPrice}</p>
          </div>
          <div className="modal-footer bg-light d-flex justify-content-end">
            <button className="btn btn-success" onClick={confirmAppointment}>Confirm</button>
            <button className="btn btn-secondary" onClick={() => setShowSummary(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Create Appointment</h5>
              <button type="button" className="btn-close" onClick={toggleModal}></button>
            </div>

            <div className="modal-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              {step === 1 && (
                <div>
                  <label className="form-label">Enter Client ID:</label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    value={clientIdInput}
                    onChange={(e) => setClientIdInput(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={fetchClient}>Continue</button>
                </div>
              )}

              {step === 2 && clientData && (
                <div>
                  <h6>Client: {clientData.firstName} {clientData.lastName} ({clientData.email})</h6>
                  <label className="form-label mt-2">Select Pet:</label>
                  <select className="form-select mb-3" value={selectedPetId || ''} onChange={e => setSelectedPetId(Number(e.target.value))}>
                    <option value=''>-- Choose Pet --</option>
                    {clientData.pets.map(pet => (
                      <option key={pet.petId} value={pet.petId}>
                        {pet.name} - {pet.breed}
                      </option>
                    ))}
                  </select>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-secondary" onClick={() => setStep(step - 1)}>Back</button>
                    <button className="btn btn-primary" onClick={fetchServices}>Continue</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h6>Select Services:</h6>
                  {services.map(service => (
                    <div key={service.serviceId} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedServices.includes(service.serviceId)}
                        onChange={() => handleServiceSelect(service.serviceId)}
                        id={`srv-${service.serviceId}`}
                      />
                      <label className="form-check-label" htmlFor={`srv-${service.serviceId}`}>
                        {service.serviceName} (${service.price}, {service.estimatedDuration} min)
                      </label>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-outline-secondary" onClick={() => setStep(step - 1)}>Back</button>
                    <button className="btn btn-primary" onClick={() => setStep(4)} disabled={selectedServices.length === 0}>Continue</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                    </select>
                  </div>

                  <div className="modal-footer bg-light d-flex justify-content-between">
                    <button className="btn btn-outline-secondary" onClick={() => setStep(step - 1)}>Back</button>
                    <div>
                      <button className="btn btn-secondary m-1" onClick={toggleModal}>Close</button>
                      <button className="btn btn-danger m-1" onClick={() => setStep(1)}>Discard</button>
                      <button className="btn btn-success m-1" onClick={handleSubmit}>Save</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showSummary && renderSummaryModal()}
    </>
  );
};

export default AddAppointment;
