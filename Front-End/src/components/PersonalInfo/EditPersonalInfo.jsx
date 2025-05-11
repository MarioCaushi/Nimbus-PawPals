import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPersonalInfo = ({ userInfo, handleToggle }) => {
    const [editableUserInfo, setEditableUserInfo] = useState(userInfo || {});
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

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
        console.log('Changes Discarded');
    };

    const editAPI = async () => {

        console.log('Editable User Info:', editableUserInfo);

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


        console.log('Payload:', payload);

        try {
            const response = await axios.put('http://localhost:5067/api/User/staff/personal', payload);
            if (response.status === 200) {
                setMessage('User info updated successfully.');
                setMessageType('success');
                handleToggle();
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

    const excludedKeys = [, 'role', 'managerId', 'doctorId', 'groomerId', 'receptionistId', 'firstName', 'lastName', "baseSalary", 'hireDate', 'personalId', 'overtimeRate', 'birthday', 'firstName', 'lastName', 'email',];


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
                                            <input
                                                type={key === 'password' ? 'password' : inputType}
                                                className="form-control"
                                                id={key}
                                                name={key}
                                                value={editableUserInfo[key] || ''}
                                                placeholder={key === 'password' ? 'Enter new password' : ''}
                                                onChange={handleChange}
                                            />

                                        </div>
                                    );

                                })}
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={handleDiscard}>Discard</button>
                        <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default EditPersonalInfo;