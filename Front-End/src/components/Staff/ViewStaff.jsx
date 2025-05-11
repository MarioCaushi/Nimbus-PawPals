import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewDetailsModal from '../Modals/StaffModals/ViewDetailsModal';

const ViewStaff = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState('');

    const [staffList, setStaffList] = useState({});
    const [staffRoles, setStaffRoles] = useState([]);

    const [tempStaffList, setTempStaffList] = useState({});

    // To deal with view details modal
    const [showModal, setShowModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState({
        role: '',
        roleId: '',
    });

    const [triggerAPI, setTriggerAPI] = useState(false);

    const handleTriggerAPI = () => {
        setTriggerAPI(prev => !prev);
        onClose();
    };

    const onClose = () => {
        setShowModal(false);
    };

    const handleDetailsClick = (staff) => {
        setSelectedStaff(staff);
        setShowModal(true);
    }

    useEffect(() => {
        getStaffAPI();

    }, [triggerAPI])

const handleSearch = async () => {

    if (!searchQuery && !role) {
        console.error("Please enter a search query or select a role");
        setTempStaffList(staffList);
        return;
    }
    const searchParams = {
        searchWord: searchQuery,
        role: role
    };


    try {
        const response = await axios.post('http://localhost:5067/api/Staff/search', searchParams);
        if (response.status === 200) {
            setTempStaffList(response.data);
            console.log("Staff list fetched successfully", response.data);
        } else {
            console.error("Error fetching staff from API");
        }
    } catch (error) {
        console.error("Error with the search API call", error);
    }
};


    const handleClear = () => {
        setSearchQuery('');
        setRole('');
    };


    const handleAddStaff = () => {
        console.log('Add new staff');
    };

    const getStaffAPI = async () => {
        try {
            const response = await axios.get('http://localhost:5067/api/Staff');
            if (response.status === 200) {
                setStaffList(response.data);
                setTempStaffList(response.data);
                setStaffRoles(Object.keys(response.data));

                console.log("Staff list fetched successfully", response.data);

            } else {
                console.error("Error fetching staff from API");
            }
        } catch (error) {
            console.error("Error with the getStaff API call", error);
        }

    };

    return (
        <>
            {/* Inputs and Buttons */}
            <div className="container my-5">
                <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center justify-content-center flex-wrap gap-3" style={{ maxWidth: '1000px', width: '100%' }}>
                        <button className="btn" onClick={handleAddStaff} style={{
                            color: 'white',
                            backgroundColor: '#f06292',
                            borderColor: '#f06292',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px',
                            padding: '8px 16px'
                        }}>Add Staff</button>

                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{ width: '160px', borderRadius: '12px' }}
                        >
                            <option value="">Select Role</option>
                            {staffRoles.map((r) => (
                                <option key={r} value={r.slice(0, -1).charAt(0).toUpperCase() + r.slice(1, -1)}>
                                    {r.slice(0, -1).charAt(0).toUpperCase() + r.slice(1, -1)}
                                </option>

                            ))}
                        </select>


                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search: Staff ID, Full Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '240px',
                                backgroundColor: 'white',
                                color: '#495057',
                                borderColor: '#ccc',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,.075)',
                                borderRadius: '20px',
                                paddingLeft: '15px'
                            }}
                        />

                        <button className="btn" onClick={handleSearch} style={{
                            color: 'white',
                            backgroundColor: '#64b5f6',
                            borderColor: '#64b5f6',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px',
                            padding: '8px 16px'
                        }}>Search</button>

                        <button className="btn btn-light" onClick={handleClear} style={{
                            borderColor: '#ddd',
                            color: 'gray',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            borderRadius: '12px',
                            padding: '8px 16px'
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

            {/* Scrollable  Card Grid */}
            <div className="container-fluid px-5 mb-5" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                <div className="d-flex flex-wrap justify-content-center gap-4">

                    {Object.entries(tempStaffList).map(([roleKey, staffArray]) =>
                        staffArray.map((staff, index) => {
                            const fullName = `${staff.firstName} ${staff.lastName}`;
                            const email = staff.email;
                            const id = staff[`${roleKey.slice(0, -1)}Id`] || index; // e.g., doctorId, groomerId, etc.
                            const roleLabel = roleKey.slice(0, -1); // removes plural: doctors → doctor

                            // Choose image based on role
                            let imageSrc = '';
                            if (roleKey === 'doctors') imageSrc = 'src/assets/Staff/doctor-icon.jpg';
                            else if (roleKey === 'groomers') imageSrc = 'src/assets/Staff/groomer-icon.jpg';
                            else if (roleKey === 'receptionists') imageSrc = 'src/assets/Staff/receptionist-icon.png';


                            return (
                                <div
                                    key={`${roleKey}-${id}`}
                                    className="card"
                                    style={{
                                        width: '11rem',
                                        borderRadius: '20px',
                                        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.08)',
                                        overflow: 'hidden',
                                        border: 'none',
                                        flex: '0 0 auto',
                                        backgroundColor: '#fff',
                                        margin: '10px'
                                    }}
                                >
                                    <img
                                        src={imageSrc}
                                        className="card-img-top"
                                        alt="Profile"
                                        style={{
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderBottom: '1px solid #eee'
                                        }}
                                    />
                                    <div className="card-body text-center p-3">
                                        <h6 className="card-title fw-bold mb-1">{fullName}</h6>
                                        <p className="card-text mb-1" style={{ fontSize: '0.85rem', color: '#555' }}>ID: {id}</p>
                                        <p className="card-text mb-1" style={{ fontSize: '0.85rem', color: '#777' }}>
                                            Role: {roleLabel.charAt(0).toUpperCase() + roleLabel.slice(1)}
                                        </p>
                                        <p className="card-text" style={{ fontSize: '0.7rem', color: '#888' }}>
                                            {email}
                                        </p>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            style={{
                                                borderRadius: '15px',
                                                fontSize: '0.85rem',
                                                width: '100%'
                                            }}
                                            onClick={() => {
                                                handleDetailsClick({role: roleLabel, roleId: id,});
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}



                </div>
            </div>

            { showModal && 
                <ViewDetailsModal
                    data={selectedStaff}
                    onClose={onClose}
                    handleTriggerAPI={handleTriggerAPI}
                />
            }


        </>
    );
};

export default ViewStaff;
