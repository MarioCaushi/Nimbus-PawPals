import React, { useState } from 'react';
import axios from 'axios';

const ClientEditStaff = ({ handleClose, editClient, handleTrigger }) => {
    const editableFields = {
        clientId: editClient.clientId,
        firstName: editClient.firstName,
        lastName: editClient.lastName,
        username: editClient.username,
        password: editClient.password,
        email: editClient.email,
        contactNumber: editClient.contactNumber,
        address: editClient.address,
        birthday: editClient.birthday,
        preferredContact: editClient.preferredContact
    };

    const [client, setClient] = useState({ ...editableFields || [] });
    const [originalClient] = useState({ ...editableFields, pets: editClient.pets || [] });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prev => ({ ...prev, [name]: value }));
    };

    const handleDeletePet = (petId) => {
        setClient(prev => ({
            ...prev,
            pets: prev.pets.filter(p => p.petId !== petId)
        }));
    };

    const handleDiscard = () => {
        setClient({ ...originalClient });
        setMessage('');
        setMessageType('');
    };

const handleSave = async () => {
const noChanges =
  Object.keys(originalClient).every(key => {
    if (key === 'pets') {
      return client.pets.length === originalClient.pets.length &&
        client.pets.every((pet, i) => pet.petId === originalClient.pets[i].petId);
    }
    return client[key] === originalClient[key];
  });


  if (noChanges) {
    setMessage('No changes made.');
    setMessageType('error');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2500);
    return;
  }

  for (const [key, value] of Object.entries(editableFields)) {
    if (client[key] === '') {
      setMessage(`Please fill in the "${key}" field.`);
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 2500);
      return;
    }
  }

  // Password check
  if (client.password.length < 8) {
    setMessage('Password must be at least 8 characters long.');
    setMessageType('error');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2500);
    return;
  }

  //  Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(client.email)) {
    setMessage('Please enter a valid email address.');
    setMessageType('error');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2500);
    return;
  }

  //  Birthday age check (must be 18 or older)
  const birthDate = new Date(client.birthday);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear = (
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
  );
  const is18OrOlder = age > 18 || (age === 18 && hasHadBirthdayThisYear);

  if (!is18OrOlder) {
    setMessage('Client must be at least 18 years old.');
    setMessageType('error');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2500);
    return;
  }

  try {
    // TODO: Replace with actual API logic
    console.log('Client ready to be submitted:', client);

    const response = await axios.put(`http://localhost:5067/api/Client/edit`, client);
    if (response.status == 200) {

        setMessage('Client information saved successfully!');
        setMessageType('success');
        setTimeout(() => {
            setMessage('');
            setMessageType('');
            handleTrigger();
        }, 2500);

    }

} catch (error) {
  console.error("Error saving client:", error);

  const backendMessage =
    error.response?.data?.message || // common pattern
    error.response?.data ||         // fallback for plain string error
    'An error occurred. Please try again.';

  setMessage(backendMessage);
  setMessageType('error');

  setTimeout(() => {
    setMessage('');
    setMessageType('');
  }, 2500);
}
};


    if (!client) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content shadow rounded-4 overflow-hidden">
                    <div className="modal-header bg-warning text-dark">
                        <h5 className="modal-title">Edit Client: 👤 {client.firstName} {client.lastName}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>

                    <div className="modal-body px-4 py-3">

                        <div className="row g-3">
                            {Object.entries(editableFields)
                                .filter(([key]) => key !== 'clientId')
                                .map(([key]) => (
                                    <div className="col-md-6" key={key}>
                                        <label className="form-label text-capitalize">
                                            {key === 'preferredContact'
                                                ? 'Preferred Contact'
                                                : key.replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        {key === 'preferredContact' ? (
                                            <select
                                                name={key}
                                                value={client[key]}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Select</option>
                                                <option value="Email">Email</option>
                                                <option value="Phone">Phone</option>
                                            </select>
                                        ) : (
                                            <input
                                                name={key}
                                                value={client[key]}
                                                onChange={handleChange}
                                                type={
                                                    key === 'password' ? 'password' :
                                                        key === 'birthday' ? 'date' :
                                                            key === 'email' ? 'email' :
                                                                'text'
                                                }
                                                className="form-control"
                                            />

                                        )}
                                    </div>
                                ))}
                        </div>

                        <hr className="my-4" />

                        {message && (
                            <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'} mt-4`} role="alert">
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="modal-footer bg-light d-flex justify-content-between">
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-success px-4 rounded-pill" onClick={handleSave}>✅ Save</button>
                            <button className="btn btn-outline-warning px-4 rounded-pill" onClick={handleDiscard}>❌ Discard</button>
                        </div>
                        <button className="btn btn-outline-secondary px-4 rounded-pill" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientEditStaff;
