import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterModal from '../Modals/RegisterModal';

function ViewClients( {loggedIn, roleLoggedIn}) {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

   const [showRegisterModal, setShowRegisterModal] = useState(false);

       const handleOpenSignUp = () => {
        setShowRegisterModal(true);
    };

    const handleCloseSignUp = () => {
        setShowRegisterModal(false);
    }

    const [trigger, setTrigger] = useState(false);
    const handleTrigger = () => {
        setTrigger(!trigger);
    };

  useEffect(() => {
    handleClientListAPI();
  }, [trigger]);

  const handleClientListAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5067/api/Client");
      if (response.status !== 200) {
        throw new Error('Failed to fetch client data');
      }
      const data = response.data;
      setClients(data);
      setFilteredClients(data);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const handleClear = () => {
    setSearch('');
    setFilteredClients(clients);
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredClients(clients);
      return;
    }

    const lowerSearch = search.toLowerCase();
    const filtered = clients.filter(client =>
      client.firstName.toLowerCase().includes(lowerSearch) ||
      client.lastName.toLowerCase().includes(lowerSearch) ||
      client.email.toLowerCase().includes(lowerSearch) ||
      client.clientId.toString().includes(lowerSearch)
    );
    setFilteredClients(filtered);
  };

  return (
    <div className="container my-5">
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-5">
        {['Manager', 'Receptionist'].includes(roleLoggedIn?.toLowerCase().trim().charAt(0).toUpperCase() + roleLoggedIn?.toLowerCase().trim().slice(1)) && (
        <button className="btn btn-pink text-white px-4 rounded-pill" style={{ backgroundColor: '#f06292' }} onClick={handleOpenSignUp}>Add Client</button>
        )}
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, or email"
          style={{ width: '250px', borderRadius: '20px', paddingLeft: '15px' }}
        />
        <button className="btn btn-primary px-4 rounded-pill" onClick={handleSearch}>Search</button>
        <button className="btn btn-light px-4 rounded-pill" onClick={handleClear}>Clear</button>
      </div>

      <div className="container-fluid px-4 mb-5" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {filteredClients.map(client => (
            <div
              key={client.clientId}
              className="card"
              style={{
                width: '16rem',
                borderRadius: '16px',
                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#f9f9fc',
                padding: '1rem'
              }}
            >
              <div className="card-body text-center">
                <h6 className="card-title fw-bold mb-2" style={{ fontSize: '1.1rem', color: '#333' }}>{client.firstName} {client.lastName}</h6>
                <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>ID: {client.clientId}</p>
                <p className="mb-3" style={{ fontSize: '0.85rem', color: '#555' }}>{client.email}</p>
                <button className="btn btn-outline-primary btn-sm rounded-pill px-3">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

          {showRegisterModal && (
            <RegisterModal
                show={showRegisterModal}
                handleClose={handleCloseSignUp} 
                loggedIn={loggedIn}
                handleTrigger={handleTrigger}
            /> )}

    </div>


  );
}

export default ViewClients;
