import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGGED_IN_KEY = 'isLoggedIn';
const ROLE_KEY = 'role';

// Don't forget to add in other routes
const AuthRedirect = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem(LOGGED_IN_KEY);
        const role = localStorage.getItem(ROLE_KEY);

        if (!token) {
            navigate('/');
        } else if (role === 'client') {
            navigate('/client');
        } else {
            navigate('/user-dashboard');
        }
    }, [navigate]);

    return null; // This component does not render anything, just performs redirection
};

export default AuthRedirect;