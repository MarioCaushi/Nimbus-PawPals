import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const InsightsDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [clients, setClients] = useState([]);
    const [bills, setBills] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const [appointmentsRes, feedbacksRes, clientsRes] = await Promise.all([
                axios.get('http://localhost:5067/api/Timetable'),
                axios.get('http://localhost:5067/api/Feedback'),
                axios.get('http://localhost:5067/api/Client')
            ]);

            setAppointments(appointmentsRes.data);
            setFeedbacks(feedbacksRes.data);
            setClients(clientsRes.data);

            const billsPromises = clientsRes.data.map(client =>
                axios.get(`http://localhost:5067/api/Client/${client.clientId}/bills`)
                    .then(res => ({ clientId: client.clientId, bills: res.data }))
                    .catch(() => ({ clientId: client.clientId, bills: [] }))
            );
            const billsData = await Promise.all(billsPromises);
            setBills(billsData);
        };
        fetchData();
    }, []);

    const appointmentStatusCounts = appointments.reduce((acc, a) => {
        acc[a.status] = (acc[a.status] || 0) + 1;
        return acc;
    }, {});

    const serviceUsage = appointments.reduce((acc, a) => {
        acc[a.serviceName] = (acc[a.serviceName] || 0) + 1;
        return acc;
    }, {});

    const topClients = bills.map(b => {
        const total = Array.isArray(b.bills)
            ? b.bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0)
            : 0;
        return { clientId: b.clientId, total };
    }).filter(tc => tc.total > 0).sort((a, b) => b.total - a.total).slice(0, 5);

    const generateWeekData = () => {
        const result = [];
        const start = new Date();
        start.setDate(start.getDate() - start.getDay() + (weekOffset * 7));

        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            const count = appointments.filter(appt => {
                const apptDate = new Date(appt.startTime);
                return apptDate.toDateString() === day.toDateString();
            }).length;
            result.push({ day: day.toLocaleDateString('en-US', { weekday: 'short' }), count });
        }

        return result;
    };

    const dailyAppointments = generateWeekData();
    const currentWeekLabel = () => {
        const start = new Date();
        start.setDate(start.getDate() - start.getDay() + (weekOffset * 7));
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [replySent, setReplySent] = useState(false);

    const deleteFeedback = async (id) => {
        if (!window.confirm('Are you sure you want to delete this feedback?')) return;
        await axios.delete(`http://localhost:5067/api/Feedback/${id}`);
        setFeedbacks(prev => prev.filter(f => f.feedbackId !== id));
    };

    const handleReplySubmit = () => {
        setReplySent(true);
        setTimeout(() => {
            setReplyText('');
            setReplySent(false);
            setReplyingTo(null);
        }, 1500);
    };

    return (
        <div className="container py-4">
            <h2 className="fs-4 fw-semibold mb-4"> Dashboard</h2>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-semibold mb-1">Appointment Status Distribution</h5>
                        <p className="text-muted small">Across all time</p>
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                                <Pie
                                    data={Object.entries(appointmentStatusCounts).map(([k, v]) => ({ name: k, value: v }))}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={70}
                                    label
                                >
                                    {Object.entries(appointmentStatusCounts).map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-semibold mb-1">Top Used Services</h5>
                        <p className="text-muted small">Across all time</p>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={Object.entries(serviceUsage).map(([k, v]) => ({ name: k, count: v }))}>
                                <XAxis dataKey="name" hide />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-semibold mb-1">Top Clients by Revenue</h5>
                        <p className="text-muted small">Cumulative billing totals</p>
                        {topClients.length === 0 ? (
                            <p className="text-muted">No billing data available yet.</p>
                        ) : (
                            <ul className="list-group list-group-flush">
                                {topClients.map(c => {
                                    const client = clients.find(cl => cl.clientId === c.clientId);
                                    return <li key={c.clientId} className="list-group-item">{client?.firstName} {client?.lastName}: €{c.total.toFixed(2)}</li>;
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="col-12">
                    <div className="card p-3 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-semibold mb-0">Appointments</h5>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setWeekOffset(weekOffset - 1)}>&lt; Prev</button>
                                <span className="text-muted small">{currentWeekLabel()}</span>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setWeekOffset(weekOffset + 1)}>Next &gt;</button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={dailyAppointments}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-semibold mb-3">Client Feedback</h5>
                        <div className="overflow-auto" style={{ maxHeight: '400px' }}>
                            {feedbacks.map(f => (
                                <div key={f.feedbackId} className="border rounded p-3 mb-3 bg-white">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-1"><strong>{f.fullName}</strong> ({f.email})</p>
                                        <span className="text-muted small">{new Date(f.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="mb-2">{f.message}</p>
                                    <div className="d-flex justify-content-end gap-2">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => setReplyingTo(f)}>Reply</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteFeedback(f.feedbackId)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

      {replyingTo && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reply to {replyingTo.fullName}</h5>
                <button type="button" className="btn-close" onClick={() => setReplyingTo(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Feedback:</strong> {replyingTo.message}</p>
                <textarea
                  className="form-control mb-2"
                  rows="4"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                ></textarea>
                {replySent && <div className="alert alert-success p-2">Reply sent successfully</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => setReplyingTo(null)}>Close</button>
                <button className="btn btn-secondary" onClick={() => setReplyText('')}>Discard</button>
                <button className="btn btn-primary" onClick={handleReplySubmit}>Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default InsightsDashboard;
