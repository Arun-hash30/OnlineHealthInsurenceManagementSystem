import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className="container">
            
            <h2>Admin Dashboard</h2>
            <ul>
                <li><Link to="/admin/users">Manage Users</Link></li>
                <li><Link to="/admin/policies">Manage Health Policies</Link></li>
                <li><Link to="/admin/policies/create">Create Policy</Link></li>
                <li><Link to="/agent/claims/process">Process Health Claims</Link></li>
            </ul>

            <Link to="/logout">Logout</Link>
        </div>
    );
}

export default AdminDashboard;
