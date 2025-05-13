import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ViewPetDetailsModal from '../Modals/PetStaffModals/ViewPetDetailsModal';
import EditPetDetailsModal from '../Modals/PetStaffModals/EditPetDetailsModal';
import AddPetModal from '../Modals/PetStaffModals/AddPetModal';


function ViewPetsStaff({ roleLoggedIn }) {

    const [pets, setPets] = useState([]);
    const [tempPets, setTempPets] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        const filtered = tempPets.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.clientName.toLowerCase().includes(search.toLowerCase()) ||
            p.petId.toString().includes(search)
        );
        setTempPets(filtered);
    };

    const handleClear = () => {
        setSearch('');
        setTempPets(pets);
    };



    // To deal with get Pets API
    const getPetsAPI = async () => {

        try {
            const response = await axios.get('http://localhost:5067/api/Pet');

            if (response.status === 200) {
                const data = response.data;
                setPets(data);
                setTempPets(data);
            }
            else {
                console.error('Error fetching pets:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    useEffect(() => {

        getPetsAPI();
    }, []);

    // To deal with show pet info modal

    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState({});

    const handleViewModalShow = (pet) => {
        setSelectedPet(pet);
        setShowViewModal(true);
    };

    const handleViewModalClose = () => {
        setShowViewModal(false);
        setSelectedPet({});
    };

    const handleEditModalShow = () => {
        setShowEditModal(true);
        setShowViewModal(false);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setShowViewModal(true);
    };
    
    // To deal with add pet modal
    const [showAddModal, setShowAddModal] = useState(false);
    const handleAddModalShow = () => {
        setShowAddModal(true);
    };
    const handleAddModalClose = () => {
        setShowAddModal(false);
    };

    return (
        <div className="container my-5">
            {/* Top Controls */}
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-5">
                {['Manager', 'Receptionist'].includes(roleLoggedIn?.toLowerCase().trim().charAt(0).toUpperCase() + roleLoggedIn?.toLowerCase().trim().slice(1)) && (
                    <button
                        className="btn text-white px-4 rounded-pill"
                        style={{
                            backgroundColor: '#f06292',
                            fontWeight: '500',
                            boxShadow: '0 4px 6px rgba(240, 98, 146, 0.3)'
                        }}
                        onClick={handleAddModalShow}
                    >
                        🐾 Add Pet
                    </button>
                )}


                <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, ID, or client"
                    style={{
                        width: '250px',
                        borderRadius: '20px',
                        paddingLeft: '15px',
                        border: '1px solid #ccc',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}
                />

                <button
                    className="btn text-white px-4 rounded-pill"
                    style={{
                        backgroundColor: '#64b5f6',
                        boxShadow: '0 4px 6px rgba(100, 181, 246, 0.3)'
                    }}
                    onClick={handleSearch}
                >
                    🔍 Search
                </button>

                <button
                    className="btn btn-light px-4 rounded-pill"
                    style={{
                        border: '1px solid #ddd',
                        color: '#777',
                        fontWeight: '500'
                    }}
                    onClick={handleClear}
                >
                    ❌ Clear
                </button>
            </div>

            {/* Scrollable Card Container */}
            <div className="container-fluid px-4 mb-5" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {tempPets.map((pet) => (
                        <div
                            key={pet.petId}
                            className="card"
                            style={{
                                width: '15rem',
                                borderRadius: '20px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)',
                                backgroundColor: '#fcfcff',
                                padding: '1rem',
                                transition: 'transform 0.2s ease',
                                border: '1px solid #eaeaea'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <div className="card-body text-center p-2">
                                <h6 className="fw-bold mb-2" style={{ fontSize: '1rem', color: '#333' }}>
                                    {pet.name}
                                </h6>
                                <p className="mb-1" style={{ fontSize: '0.85rem', color: '#666' }}>ID: {pet.petId}</p>
                                <p className="mb-1" style={{ fontSize: '0.85rem', color: '#666' }}>Species: {pet.species}</p>
                                <p className="mb-1" style={{ fontSize: '0.85rem', color: '#666' }}>Breed: {pet.breed}</p>
                                <p className="mb-3" style={{ fontSize: '0.85rem', color: '#888' }}>Client: {pet.clientName}</p>
                                <button
                                    className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                    onClick={() => handleViewModalShow(pet)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showViewModal && (
                <ViewPetDetailsModal
                    show={showViewModal}
                    handleClose={handleViewModalClose}
                    pet={selectedPet}
                    roleLoggedIn={roleLoggedIn}
                    handleEditClick={handleEditModalShow} // pass this
                />
            )}

            {showEditModal && (
                <EditPetDetailsModal
                    show={showEditModal}
                    handleClose={handleEditModalClose}
                    pet={selectedPet}
                />
            )}

            {showAddModal && (
                <AddPetModal
                    show={showAddModal}
                    handleClose={handleAddModalClose}
                />
            )}


        </div>
    );
}

export default ViewPetsStaff;
