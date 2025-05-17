import React, { useState } from 'react';
import {
    format,
    isSameDay,
    parseISO,
    addWeeks,
    startOfWeek,
    isAfter,
    startOfDay,
} from 'date-fns';

const generateMockAppointments = () => {
    const today = new Date();
    const thisMonday = startOfWeek(today, { weekStartsOn: 1 });

    const create = (dayOffset, hour, minute, overrides = {}) => ({
        appointmentId: Math.floor(Math.random() * 10000),
        startTime: new Date(thisMonday.getFullYear(), thisMonday.getMonth(), thisMonday.getDate() + dayOffset, hour, minute).toISOString(),
        endTime: new Date(thisMonday.getFullYear(), thisMonday.getMonth(), thisMonday.getDate() + dayOffset, hour, minute + 30).toISOString(),
        status: 'Confirmed',
        petName: 'Pet' + Math.floor(Math.random() * 100),
        petSpecies: 'Dog',
        petBreed: 'Mixed',
        petOwner: 'Owner ' + String.fromCharCode(65 + dayOffset),
        serviceName: 'Service ' + (dayOffset + 1),
        serviceType: 'general',
        serviceDescription: 'Detailed info about the service provided.',
        price: 20,
        estimatedDuration: '30 mins',
        ...overrides
    });

    return [
        create(0, 9, 0, { petName: 'Kiwi', petSpecies: 'Bird', petBreed: 'Parakeet', serviceName: 'Checkup', petOwner: 'William Taylor', serviceType: 'general' }),
        create(0, 14, 30, { serviceType: 'grooming' }),
        create(1, 10, 0, { serviceType: 'grooming' }),
        create(1, 15, 30, { serviceType: 'grooming' }),
        create(2, 11, 0, { serviceType: 'general' }),
        create(2, 16, 0, { serviceType: 'general' }),
        create(3, 11, 0, { petName: 'Buddy', petSpecies: 'Dog', petBreed: 'Labrador', serviceName: 'Grooming', petOwner: 'Olivia Reed', serviceType: 'grooming' }),
        create(3, 13, 0, { petName: 'Luna', petSpecies: 'Cat', petBreed: 'Persian', serviceName: 'Vaccination', petOwner: 'Emma Green', serviceType: 'general' }),
        create(3, 17, 30, { serviceType: 'general' }),
        create(4, 10, 15, { serviceType: 'surgery' }),
        create(4, 18, 0, { serviceType: 'surgery' }),
        create(5, 8, 45, { serviceType: 'grooming' }),
        create(5, 12, 0, { serviceType: 'grooming' }),
        create(6, 9, 30, { serviceType: 'general' }),
        create(6, 15, 0, { serviceType: 'general' }),
        create(2, 13, 0, { status: 'Pending', petName: 'Milo', petBreed: 'Beagle', serviceName: 'Dental Check', petOwner: 'Chloe Wells', serviceType: 'general' }),
        create(4, 11, 30, { status: 'Pending', petName: 'Shadow', petBreed: 'Husky', serviceName: 'Surgery Prep', petOwner: 'Liam Scott', serviceType: 'surgery' }),
        create(6, 14, 30, { status: 'Pending', petName: 'Zoe', petBreed: 'Siamese', serviceName: 'Behavioral Review', petOwner: 'Emma Green', serviceType: 'general' }),
    ];
};

const ViewTimetableStaff = ({ roleLoggedIn }) => {
    const [appointments, setAppointments] = useState(generateMockAppointments());
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [filter, setFilter] = useState('all');

    const currentWeekStart = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset);
    const days = Array.from({ length: 7 }, (_, i) => new Date(currentWeekStart.getTime() + i * 86400000));

    const isTodayOrAfter = (date) => {
        const todayStart = startOfDay(new Date());
        return isAfter(date, todayStart) || isSameDay(date, todayStart);
    };

    const handleStatusChange = (id, newStatus) => {
        setAppointments(prev =>
            prev.map(appt => appt.appointmentId === id ? { ...appt, status: newStatus } : appt)
        );
    };

    const filteredPending = (roleLoggedIn === 'Manager' || roleLoggedIn === 'Receptionist')
        ? appointments.filter(appt =>
            appt.status === 'Pending' &&
            isTodayOrAfter(parseISO(appt.startTime)) &&
            (filter === 'all' || appt.serviceType === filter)
        )
        : [];

    return (
        <div className="container my-5">
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
                                appt.status === 'Confirmed' &&
                                isSameDay(apptDate, day) &&
                                (!isInCurrentWeek || isTodayOrAfter(apptDate)) &&
                                (filter === 'all' || appt.serviceType === filter)
                            );
                        }).map(appt => (
                            <div key={appt.appointmentId} className="bg-light p-2 mb-2 rounded shadow-sm border" style={{ cursor: 'pointer' }} onClick={() => setSelectedAppointment(appt)}>
                                <strong>{appt.petName}</strong><br />
                                <small>{format(parseISO(appt.startTime), 'HH:mm')} - {format(parseISO(appt.endTime), 'HH:mm')}</small><br />
                                <small>{appt.serviceName}</small><br />
                                <small className="text-muted">{appt.petOwner}</small>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {(roleLoggedIn === 'Manager' || roleLoggedIn === 'Receptionist') && (
                <>
                    <h3 className="mt-5">Pending Appointments</h3>
                    {filteredPending.length === 0 ? (
                        <p className="text-center text-muted mt-3">There are no pending appointments for the selected service type.</p>
                    ) : (
                        <div className="row mt-3">
                            {filteredPending.map(appt => (
                                <div key={appt.appointmentId} className="col-md-6 col-lg-4 mb-3">
                                    <div className="card shadow-sm border border-warning-subtle bg-white" style={{ cursor: 'pointer' }} onClick={() => setSelectedAppointment(appt)}>
                                        <div className="card-body">
                                            <h5 className="card-title d-flex justify-content-between">
                                                <span>{appt.petName}</span>
                                                <span className="badge bg-warning text-dark">Pending</span>
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{appt.serviceName}</h6>
                                            <p className="mb-1"><strong>Time:</strong> {format(parseISO(appt.startTime), 'PPpp')}</p>
                                            <p className="mb-1"><strong>Owner:</strong> {appt.petOwner}</p>
                                            <p className="mb-2"><strong>Estimated:</strong> {appt.estimatedDuration}</p>
                                            <div className="d-flex justify-content-end gap-2">
                                                <button className="btn btn-sm btn-success rounded-pill px-3" onClick={(e) => { e.stopPropagation(); handleStatusChange(appt.appointmentId, 'Confirmed'); }}>Accept</button>
                                                <button className="btn btn-sm btn-outline-dark rounded-pill px-3" onClick={(e) => { e.stopPropagation(); handleStatusChange(appt.appointmentId, 'Declined'); }}>Decline</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

                        {selectedAppointment && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4">
                            <div className="modal-header bg-light border-bottom">
                                <h5 className="modal-title text-primary">Appointment Details</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedAppointment(null)}></button>
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
                            <div className="modal-footer">
                                <button className="btn btn-secondary rounded-pill px-4" onClick={() => setSelectedAppointment(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewTimetableStaff;