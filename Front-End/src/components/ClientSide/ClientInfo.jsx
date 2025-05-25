// Top imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientInfo = ({ userId }) => {
  const [client, setClient] = useState(null);
  const [bills, setBills] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientRes = await axios.get(`http://localhost:5067/api/Client/${userId}`);
        const billsRes = await axios
          .get(`http://localhost:5067/api/Client/${userId}/bills`)
          .catch(() => ({ data: [] }));

        const safeClient = { ...clientRes.data, pets: Array.isArray(clientRes.data.pets) ? clientRes.data.pets : [] };
        setClient(safeClient);
        setEditForm(safeClient);
        setBills(Array.isArray(billsRes.data) ? billsRes.data : []);
      } catch (err) {
        console.error('Error fetching client data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClientDetails();
  }, [userId]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDiscard = () => {
    setEditForm(client);
    setMessage({ type: 'info', text: 'Changes discarded.' });
  };

  const handleSave = async () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'username', 'password', 'contactNumber', 'birthday', 'preferredContact', 'address'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthDate = new Date(editForm.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    for (let field of requiredFields) {
      if (!editForm[field] || editForm[field].trim() === '') {
        setMessage({ type: 'error', text: `Please fill in the ${field.replace(/([A-Z])/g, ' $1')} field.` });
        return;
      }
    }

    if (editForm.password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    if (!emailRegex.test(editForm.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (age < 18) {
      setMessage({ type: 'error', text: 'You must be at least 18 years old.' });
      return;
    }

    const isUnchanged = requiredFields.every(field => client[field] === editForm[field]);
    if (isUnchanged) {
      setMessage({ type: 'info', text: 'No changes were made.' });
      return;
    }

    try {
      await axios.put('http://localhost:5067/api/Client/edit', editForm);
      setClient(editForm);
      setEditMode(false);
      setMessage({ type: 'success', text: 'Your information has been updated successfully.' });
    } catch (err) {
      const errorMsg = err.response?.data || 'An error occurred while updating your information.';
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  if (loading || !client) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;

  return (
    <div className="container py-5">
      <div className="card shadow rounded-4 overflow-hidden">
        <div className="card-header text-white" style={{ backgroundColor: '#5c6bc0' }}>
          <h5 className="mb-0">{client.firstName} {client.lastName}'s Profile</h5>
        </div>

        <div className="card-body px-4 py-3">
          {message.text && (
            <div className={`alert alert-${message.type === 'error' ? 'danger' : message.type === 'success' ? 'success' : 'info'}`}>
              {message.text}
            </div>
          )}

          <div className="row g-3 mb-3">
            {["firstName", "lastName", "email", "username", "password", "contactNumber", "birthday", "preferredContact", "address"].map((field, i) => (
              field === 'password' && !editMode ? null : (
                <div key={i} className="col-md-6">
                  <label className="form-label fw-semibold text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  {editMode ? (
                    field === 'preferredContact' ? (
                      <select className="form-select" name="preferredContact" value={editForm.preferredContact || ''} onChange={handleEditChange}>
                        <option value="">Select Contact Method</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                      </select>
                    ) : (
                      <div className="input-group">
                        <input
                          className="form-control"
                          name={field}
                          value={editForm[field] || ''}
                          type={field === 'birthday' ? 'date' : field === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                          onChange={handleEditChange}
                        />
                        {field === 'password' && (
                          <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? 'Hide' : 'Show'}
                          </button>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="form-control bg-light">{client[field]}</div>
                  )}
                </div>
              )
            ))}

            <div className="col-md-6">
              <label className="form-label fw-semibold">Registered</label>
              <div className="form-control bg-light">{new Date(client.registeredDate).toLocaleDateString()}</div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Client ID</label>
              <div className="form-control bg-light">{client.clientId}</div>
            </div>
          </div>

          {!editMode && (
            <div className="px-4 pb-4">
              <h6 className="fw-bold mb-3">Registered Pets</h6>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div className="row g-3">
                  {client.pets.length > 0 ? (
                    client.pets.map(pet => (
                      <div key={pet.petId} className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-3">
                          <div className="card-body">
                            <h6 className="card-title mb-1"><strong>{pet.name}</strong></h6>
                            <p className="mb-1 text-muted">{pet.species} • {pet.breed}</p>
                            <span className="badge bg-secondary">Pet ID: {pet.petId}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-muted ps-2">
                      This client has got no pets.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card-footer bg-light d-flex justify-content-end gap-2 flex-wrap">
          {editMode ? (
            <>
              <button className="btn btn-success rounded-pill px-4" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary rounded-pill px-4" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-outline-dark rounded-pill px-4" onClick={() => setEditMode(false)}>Close</button>
            </>
          ) : (
            <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => setEditMode(true)}>Edit Info</button>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="mb-3 text-primary">Billing History</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-muted small mb-0">
            Total Spent: ${bills.reduce((sum, bill) => sum + bill.totalAmount, 0).toFixed(2)}
          </p>
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm" onChange={(e) => setBillsFilter(e.target.value)} defaultValue="All">
              <option value="All">All Methods</option>
              {[...new Set(bills.map(b => b.paymentMethod))].map((method, i) => (
                <option key={i} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="border rounded p-3 shadow-sm bg-white" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {bills.length === 0 ? (
            <p className="text-muted">This client has no bills.</p>
          ) : (
            bills.map(bill => (
              <div key={bill.billId} className="mb-4 p-3 border rounded bg-light">
                <h6 className="fw-bold text-primary">Bill #{bill.billId}</h6>
                <p className="mb-1"><strong>Date:</strong> {new Date(bill.date).toLocaleString()}</p>
                <p className="mb-1"><strong>Total:</strong> ${bill.totalAmount}</p>
                <p className="mb-2"><strong>Payment Method:</strong> {bill.paymentMethod}</p>
                {bill.products.length > 0 && (
                  <div>
                    <h6 className="mt-3">Products:</h6>
                    <ul className="list-group mb-2">
                      {bill.products.map((p, i) => (
                        <li key={i} className="list-group-item">{p.productName} - ${p.price}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {bill.services.length > 0 && (
                  <div>
                    <h6 className="mt-3">Services:</h6>
                    <ul className="list-group">
                      {bill.services.map((s, i) => (
                        <li key={i} className="list-group-item">{s.serviceName} ({s.serviceType}) - ${s.price}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
