import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditDetailsModal = ({ userInfo, onClose, handleTriggerAPI }) => {
    const [editableUserInfo, setEditableUserInfo] = useState(userInfo || {});
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (editableUserInfo.password && editableUserInfo.password.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            setMessageType('error');
            clearMessageAfterDelay();
            return;
        }

        if (JSON.stringify(editableUserInfo) === JSON.stringify(userInfo)) {
            setMessage('No changes made.');
            setMessageType('error');
            clearMessageAfterDelay();
            return;
        }

        editAPI();
    };

    const handleDiscard = () => {
        setEditableUserInfo(userInfo);
    };

    const editAPI = async () => {
        const role = userInfo.role?.toLowerCase();
        const roleId =
            role === 'manager' ? userInfo.managerId :
                role === 'doctor' ? userInfo.doctorId :
                    role === 'groomer' ? userInfo.groomerId :
                        role === 'receptionist' ? userInfo.receptionistId :
                            null;

        const payload = {
            role: userInfo.role,
            roleId: roleId,
            username: editableUserInfo.username,
            password: editableUserInfo.password,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            contactNumber: editableUserInfo.contactNumber,
            address: editableUserInfo.address,
            birthday: editableUserInfo.birthday
        };

        try {
            const response = await axios.put('http://localhost:5067/api/User/staff/personal', payload);
            if (response.status === 200) {
                setMessage('User info updated successfully.');
                setMessageType('success');
                handleTriggerAPI();

            } else {
                setMessage('Failed to update user info.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error updating user info.');
            setMessageType('error');
        } finally {
            clearMessageAfterDelay();
        }
    };

    const clearMessageAfterDelay = () => {
        setTimeout(() => {
            setMessage(null);
            setMessageType('');
        }, 3000);
    };

    const excludedKeys = [
        'role', 'managerId', 'doctorId', 'groomerId', 'receptionistId', 'firstName', 'lastName',
        'baseSalary', 'hireDate', 'personalId', 'overtimeRate', 'birthday', 'email'
    ];

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow border-0 rounded-4" style={{ backgroundColor: '#fefefe' }}>
                    <div className="modal-header bg-info text-white">
                        <h5 className="modal-title">Edit Staff Member</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body px-4 py-3">
                        {message && (
                            <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'}`} role="alert">
                                {message}
                            </div>
                        )}
                        <div className="row">
                            {Object.entries(editableUserInfo)
                                .filter(([key]) => !excludedKeys.includes(key))
                                .map(([key, value]) => {
                                    const isDate = key.toLowerCase().includes('date') || key.toLowerCase().includes('birthday');
                                    const inputType = isDate ? 'date' : 'text';
                                    const formattedValue = isDate && typeof value === 'string' && value.includes('T')
                                        ? value.split('T')[0]
                                        : value;
                                    return (
                                        <div className="col-md-6 mb-3" key={key}>
                                            <label htmlFor={key} className="form-label text-capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            {key === 'specialty' && userInfo.role?.toLowerCase() === 'doctor' ? (
                                                <select
                                                    className="form-select"
                                                    id={key}
                                                    name={key}
                                                    value={editableUserInfo[key] || ''}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Specialty</option>
                                                    <option value="General Veterinary">General Veterinary</option>
                                                    <option value="Surgery">Surgery</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type={inputType}
                                                    className="form-control"
                                                    id={key}
                                                    name={key}
                                                    value={editableUserInfo[key] || ''}
                                                    onChange={handleChange}
                                                />
                                            )}

                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="modal-footer bg-light d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-danger" onClick={onClose} >Close</button>
                        <button type="button" className="btn btn-secondary me-2" onClick={handleDiscard}>Discard</button>
                        <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDetailsModal;
