import React from 'react';
import { Link } from 'react-router-dom';

function AgentDashboard() {
    return (
        <div className="container">
            <h2>Agent Dashboard</h2>
            <ul>
                <li><Link to="/agent/clients">View Clients</Link></li>
                <li><Link to="/agent/policies">View Health Policies</Link></li>
            </ul>

            <Link to="/logout">Logout</Link>
        </div>

        
    );
}

export default AgentDashboard;
