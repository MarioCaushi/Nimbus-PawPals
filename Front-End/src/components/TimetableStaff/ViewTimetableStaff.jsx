import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAppointment from './AddAppointment';

import {
    format,
    isSameDay,
    parseISO,
    addWeeks,
    startOfWeek,
    isAfter,
    startOfDay,
} from 'date-fns';

const ViewTimetableStaff = ({ roleLoggedIn, userId }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [filter, setFilter] = useState('all');

    const [trigger, setTrigger] = useState(false);
    const toggleTrigger = () => {
        setTrigger(prev => !prev);
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("http://localhost:5067/api/Timetable");
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching timetable:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [trigger]);

    const currentWeekStart = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset);
    const days = Array.from({ length: 7 }, (_, i) => new Date(currentWeekStart.getTime() + i * 86400000));

    const isTodayOrAfter = (date) => {
        const todayStart = startOfDay(new Date());
        return isAfter(date, todayStart) || isSameDay(date, todayStart);
    };

    const filteredPending = (roleLoggedIn === 'Manager' || roleLoggedIn === 'Receptionist')
        ? appointments.filter(appt => {
            const apptDate = parseISO(appt.startTime);
            return (
                appt.status === 'Pending' &&
                isTodayOrAfter(apptDate) &&
                (filter === 'all' || appt.serviceType?.toLowerCase() === filter)
            );
        })
        : [];

    const updateAppointmentStatus = async (appointmentId, newStatus) => {
        try {
            await axios.put("http://localhost:5067/api/Timetable", {
                appointmentId,
                status: newStatus
            });

            setAppointments(prev =>
                prev.map(appt =>
                    appt.appointmentId === appointmentId ? { ...appt, status: newStatus } : appt
                )
            );

            if (newStatus === 'Cancelled') {
                alert("Appointment has been canceled.");
            }
        } catch (error) {
            console.error(`Failed to update appointment ${appointmentId} to ${newStatus}:`, error);
            alert("Failed to update appointment status. Please try again.");
        }
    };

    const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);

    const toggleModal = () => {
        setShowAddAppointmentModal(prev => !prev);
    };


    return (

        <div className="container my-5">
            {(roleLoggedIn === 'Manager' || roleLoggedIn === 'Receptionist' || roleLoggedIn === "Client") && (
            <div className="d-flex justify-content-center mb-5">
                <button
                    className="btn btn-primary px-5 py-2 rounded-pill fw-semibold shadow-sm"
                    style={{
                        fontSize: '1rem',
                        letterSpacing: '0.5px',
                        backgroundImage: 'linear-gradient(to right, #00b4db, #0083b0)',
                        border: 'none',
                        transition: 'all 0.3s ease-in-out'
                    }}
                    onClick={() => toggleModal()}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    ➕ Add Appointment
                </button>
            </div>
            )}




            {loading && <p className="text-muted">Loading appointments...</p>}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Weekly Timetable ({format(currentWeekStart, 'MMMM dd')} - {format(new Date(currentWeekStart.getTime() + 6 * 86400000), 'MMMM dd, yyyy')})</h3>
                <div className="d-flex gap-2 align-items-center">
                    <select className="form-select form-select-sm rounded-pill border-secondary text-dark" style={{ width: '160px' }} value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Services</option>
                        <option value="general">General</option>
                        <option value="grooming">Grooming</option>
                        <option value="surgery">Surgery</option>
                    </select>
                    <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => setWeekOffset(prev => prev - 1)}>Previous</button>
                    <button className="btn btn-outline-dark btn-sm rounded-pill" onClick={() => setWeekOffset(0)}>Today</button>
                    <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => setWeekOffset(prev => prev + 1)}>Next</button>
                </div>
            </div>

            <p className="text-muted mb-2">Click on any appointment card below to view full details.</p>

            <div className="d-flex justify-content-between overflow-auto border rounded bg-white p-3 shadow-sm" style={{ borderRadius: '12px' }}>
                {days.map(day => (
                    <div key={day.toISOString()} className="p-2" style={{ minWidth: '180px' }}>
                        <h6 className="text-primary">{format(day, 'EEEE, MMM dd')}</h6>
                        <hr />
                        {appointments.filter(appt => {
                            const apptDate = parseISO(appt.startTime);
                            const isInCurrentWeek = isSameDay(startOfWeek(apptDate, { weekStartsOn: 1 }), currentWeekStart);
                            return (
                                ['Confirmed', 'Finished'].includes(appt.status) &&
                                isSameDay(apptDate, day) &&
                                (!isInCurrentWeek || isTodayOrAfter(apptDate)) &&
                                (filter === 'all' || appt.serviceType?.toLowerCase() === filter)
                            );
                        }).map(appt => (
                            <div
                                key={appt.appointmentId}
                                className="bg-light p-2 mb-2 rounded shadow-sm border"
                                style={{ cursor: 'pointer' }}
                                onClick={() => setSelectedAppointment(appt)}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <strong>{appt.petName}</strong>
                                    <small className={`badge rounded-pill ${appt.status === 'Finished' ? 'bg-success' :
                                        appt.status === 'Cancelled' ? 'bg-danger' :
                                            appt.status === 'Declined' ? 'bg-secondary' :
                                                appt.status === 'Pending' ? 'bg-warning text-dark' :
                                                    'bg-primary'
                                        }`}>
                                        {appt.status}
                                    </small>
                                </div>
                                <small>{format(parseISO(appt.startTime), 'HH:mm')} - {format(parseISO(appt.endTime), 'HH:mm')}</small><br />
                                <small>{appt.serviceName}</small><br />
                                <small className="text-muted">{appt.petOwner}</small>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Pending Appointments */}
            {roleLoggedIn === 'Manager' || roleLoggedIn === 'Receptionist' ? (
                <>
                    <h3 className="mt-5">Pending Appointments</h3>
                    {filteredPending.length === 0 ? (
                        <p className="text-center text-muted mt-3">There are no pending appointments for the selected service type.</p>
                    ) : (
                        <div className="row mt-3">
                            {filteredPending.map(appt => (
                                <div key={appt.appointmentId} className="col-md-6 col-lg-4 mb-3">
                                    <div className="card shadow-sm border border-warning-subtle bg-white" onClick={() => setSelectedAppointment(appt)}>
                                        <div className="card-body">
                                            <h5 className="card-title d-flex justify-content-between">
                                                <span>{appt.petName}</span>
                                                <span className="badge bg-warning text-dark">Pending</span>
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{appt.serviceName}</h6>
                                            <p><strong>Time:</strong> {format(parseISO(appt.startTime), 'PPpp')}</p>
                                            <p><strong>Owner:</strong> {appt.petOwner}</p>
                                            <p><strong>Estimated:</strong> {appt.estimatedDuration}</p>
                                            <div className="d-flex justify-content-end gap-2">
                                                <button className="btn btn-sm btn-success" onClick={(e) => { e.stopPropagation(); updateAppointmentStatus(appt.appointmentId, 'Confirmed'); }}>Accept</button>
                                                <button className="btn btn-sm btn-outline-dark" onClick={(e) => { e.stopPropagation(); updateAppointmentStatus(appt.appointmentId, 'Declined'); }}>Decline</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : null}

            {/* Modal */}
            {selectedAppointment && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4">
                            <div className="modal-header bg-light border-bottom">
                                <h5 className="modal-title text-primary">Appointment Details</h5>
                                <button className="btn-close" onClick={() => setSelectedAppointment(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Pet:</strong> {selectedAppointment.petName} ({selectedAppointment.petSpecies}, {selectedAppointment.petBreed})</p>
                                <p><strong>Owner:</strong> {selectedAppointment.petOwner}</p>
                                <p><strong>Service:</strong> {selectedAppointment.serviceName} ({selectedAppointment.serviceType})</p>
                                <p><strong>Description:</strong> {selectedAppointment.serviceDescription}</p>
                                <p><strong>Time:</strong> {format(parseISO(selectedAppointment.startTime), 'PPpp')} - {format(parseISO(selectedAppointment.endTime), 'HH:mm')}</p>
                                <p><strong>Duration:</strong> {selectedAppointment.estimatedDuration}</p>
                                <p><strong>Price:</strong> ${selectedAppointment.price}</p>
                                <p><strong>Status:</strong> {selectedAppointment.status}</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-between">
                                {selectedAppointment.status === 'Confirmed' && (
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-danger" onClick={() => { if (window.confirm("Are you sure?")) { updateAppointmentStatus(selectedAppointment.appointmentId, 'Cancelled'); setSelectedAppointment(null); } }}>Cancel</button>
                                        <button className="btn btn-outline-success" onClick={() => { updateAppointmentStatus(selectedAppointment.appointmentId, 'Finished'); setSelectedAppointment(null); }}>Finish</button>
                                    </div>
                                )}
                                {selectedAppointment.status === 'Pending' && (
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-success" onClick={() => { updateAppointmentStatus(selectedAppointment.appointmentId, 'Confirmed'); setSelectedAppointment(null); }}>Accept</button>
                                        <button className="btn btn-outline-dark" onClick={() => { updateAppointmentStatus(selectedAppointment.appointmentId, 'Declined'); setSelectedAppointment(null); }}>Decline</button>
                                    </div>
                                )}
                                <button className="btn btn-secondary" onClick={() => setSelectedAppointment(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddAppointmentModal && (
                <AddAppointment 
                toggleModal={toggleModal} 
                roleLoggedIn={roleLoggedIn}
                userId={userId}
                toggleTrigger={toggleTrigger} />
            )}
        </div>
    );
};

export default ViewTimetableStaff;
