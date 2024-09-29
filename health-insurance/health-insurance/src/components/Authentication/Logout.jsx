import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = React.useCallback(() => {
        localStorage.removeItem('role');

        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    React.useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return (
        <div className="logout-container">
            <p>Logging out...</p>
        </div>
    );
}

export default Logout;
