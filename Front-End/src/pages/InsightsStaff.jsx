import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavBars/NavigationBar';
import InsightsDashboard from '../components/Insights/InsightsDashboard';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

const InsightsStaff = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem(LOGGED_IN_KEY);
        const savedRole = localStorage.getItem(ROLE_KEY); // Renamed to avoid shadowing
        if (token) {
            setLoggedIn(true);
            setRole(savedRole);
        }
    }, []);

    return (
        <div>
            <div style={{ marginTop: '80px' }}>
                <NavigationBar loggedIn={loggedIn} role={role} />
                <div className="container mt-5">
                    <h2>📊 Insights</h2>
                    <p className="text-muted mb-2">Here you can find insights about the clinic's performance, client engagement, and more.</p>
                    <InsightsDashboard />
                </div>
            </div>
        </div>
    );


}

export default InsightsStaff;
