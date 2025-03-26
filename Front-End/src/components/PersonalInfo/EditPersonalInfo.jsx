import React, { useState, useEffect } from 'react';


const EditPersonalInfo = ({ userInfo }) => {

    const [editableUserInfo, setEditableUserInfo] = useState(userInfo || {});

    useEffect(() => {
        setEditableUserInfo(userInfo);
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log('Saved Info:', editableUserInfo);
        // Typically here you would send the updated info to the server
    };

    const handleDiscard = () => {
        setEditableUserInfo(userInfo);
        console.log('Changes Discarded');
    };

    return (
        <div className="container my-5">
            <form>
                <div className="card shadow" style={{
                    borderRadius: '15px',
                    backgroundColor: '#e1f5fe',
                    border: '1px solid rgb(189, 230, 249)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 20px rgba(0, 0, 0, 0.1)'
                }}>
                    <div className="card-header" style={{ backgroundColor: '#b3e5fc', color: 'black' }}>
                        Edit - Personal Information
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={editableUserInfo.name || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={editableUserInfo.lastName || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="birthday" className="form-label">Birthday</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="birthday"
                                    name="birthday"
                                    value={editableUserInfo.birthday || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={editableUserInfo.address || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={editableUserInfo.email || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={editableUserInfo.contactNumber || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="card-footer d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary me-2" onClick={handleDiscard}>Discard</button>
                                <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPersonalInfo;
