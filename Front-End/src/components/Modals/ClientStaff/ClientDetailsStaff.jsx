import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ClientDetailsStaff = ({ clientId, handleClose, handleTrigger, handleOpenEditClient, handleOpenBillsModal }) => {

    const [client, setClient] = useState(null);

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${client.firstName} ${client.lastName}?`)) {
            console.log('Delete client:', client.clientId);
            try {
                const response = await axios.delete(`http://localhost:5067/api/Client/${clientId}`);
                if (response.status === 200) {
                    console.log('Client deleted successfully');
                    handleTrigger(); // Refresh client list
                    handleClose(); // Close modal
                } else {
                    console.error('Failed to delete client');
                }
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    };

    const handleShowPurchaseHistory = () => {
        handleOpenBillsModal(clientId);
    };

    const fetchClientDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5067/api/Client/${clientId}`);
            if (response.status === 200) {
                setClient(response.data);
            } else {
                console.error('Failed to fetch client details');
            }
        } catch (error) {
            console.error('Error fetching client details:', error);
        }
    }

    useEffect(() => {
        fetchClientDetails();
    }, [clientId]);

    if (!client) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content shadow-lg rounded-4 overflow-hidden">
                    <div className="modal-header text-white" style={{ backgroundColor: '#5c6bc0' }}>
                        <h5 className="modal-title"> 👤 {client.firstName} {client.lastName}'s Profile</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                    </div>

                    <div className="modal-body px-4 py-3">
                        <div className="row g-3 mb-3">
                            <div className="col-md-6"><strong>Email:</strong> {client.email}</div>
                            <div className="col-md-6"><strong>Username:</strong> {client.username}</div>
                            <div className="col-md-6"><strong>Phone:</strong> {client.contactNumber}</div>
                            <div className="col-md-6"><strong>Birthday:</strong> {client.birthday}</div>
                            <div className="col-md-6"><strong>Preferred Contact:</strong> {client.preferredContact}</div>
                            <div className="col-md-6"><strong>Registered:</strong> {new Date(client.registeredDate).toLocaleDateString()}</div>
                            <div className="col-12 mt-2"><strong>Address:</strong> {client.address}</div>
                            <div className="col-12 mt-2"><strong>ID:</strong> {client.clientId}</div>
                        </div>

                        <hr className="my-4" />

                        <h6 className="fw-bold mb-3">🐾 Registered Pets</h6>
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

                    <div className="modal-footer bg-light d-flex justify-content-between flex-wrap gap-2">
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-warning rounded-pill px-4" onClick={() => { handleOpenEditClient(client) }}>✏️ Edit</button>
                            <button className="btn btn-outline-danger rounded-pill px-4" onClick={handleDelete}>🗑️ Delete</button>
                            <button className="btn btn-outline-info rounded-pill px-4" onClick={handleShowPurchaseHistory}>🧾 Purchase History</button>
                        </div>
                        <button className="btn btn-outline-secondary rounded-pill px-4" onClick={handleClose}>
                            ❌ Close
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ClientDetailsStaff;
