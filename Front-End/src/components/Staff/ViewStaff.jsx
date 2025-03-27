import React, { useState } from 'react';

const ViewStaff = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchQuery, 'in role:', role);
    };

    const handleClear = () => {
        setSearchQuery('');
        setRole('');
    };

    const handleAddStaff = () => {
        console.log('Add new staff');
    };

    return (
        <>
            {/*Inputs and buttons */}
            <div className="container my-5">
                <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center justify-content-center" style={{ maxWidth: '900px', width: '100%', gap: '15px' }}>
                        <button className="btn" onClick={handleAddStaff} style={{
                            color: 'white',
                            backgroundColor: '#f06292',
                            borderColor: '#f06292',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>Add Staff</button>
                        <select className="form-select mx-2" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '160px' }}>
                            <option value="">Select Role</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Groomer">Groomer</option>
                            <option value="Receptionist">Receptionist</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '250px', backgroundColor: 'white', color: '#495057', borderColor: '#6c757d', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.075)', borderRadius: '30px' }}
                        />
                        <button className="btn" onClick={handleSearch} style={{
                            color: 'white',
                            backgroundColor: '#64b5f6',
                            borderColor: '#64b5f6',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>Search</button>
                        <button className="btn btn-light" onClick={handleClear} style={{
                            borderColor: '#ddd',
                            color: 'gray', // More subtle color
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>Clear</button>
                    </div>
                </div>
                <span style={{
                    display: 'block',
                    marginTop: '10px',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: '#6c757d',
                    fontStyle: 'italic'
                }}>
                    Select what type of staff you want to Add / Search first
                </span>
            </div>

            {/*Scrollable Container */}
            <div className="container-fluid my-4">
                <div className="d-flex flex-wrap justify-content-center" style={{ overflowY: 'auto', height: '400px', alignContent: 'flex-start' }}>
                    {Array.from({ length: 20 }, (_, i) => (
                        <div className="card m-3" style={{
                            width: '12rem', // Reduced width
                            height: 'auto',
                            borderRadius: '15px', // Rounded corners
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Enhanced shadow for a 3D effect
                            overflow: 'hidden' // Ensures nothing spills out of the rounded corners
                        }}>
                            <img src="/path/to/image.jpg" className="card-img-top" alt="Profile" style={{
                                height: '180px', // Increased height for the image
                                objectFit: 'cover'
                            }} />
                            <div className="card-body text-center">
                                <h5 className="card-title">John Doe {i + 1}</h5>
                                <p className="card-text">ID: {1001 + i}</p>
                                <p className="card-text">Role: Doctor</p>
                                <button className="btn btn-outline-primary mt-2" style={{
                                    width: '100%', // Button width to fill the card
                                    borderRadius: '0' // Flat bottom edge to align with card design
                                }}>View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ViewStaff;
