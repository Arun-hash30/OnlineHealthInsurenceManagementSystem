import React from 'react';
import { Link } from 'react-router-dom';

function CustomerDashboard() {
    return (
        <div className="container">
            <h2>Customer Dashboard</h2>
            <ul>
                <li><Link to="/customer/policies">View Health Policies</Link></li>
                <li><Link to="/customer/purchase-policy">Purchase Health Policy</Link></li>              
                <li><Link to="/customer/file-claim">File Your Claim</Link></li>
                <li><Link to="/customer/claim-status">Check Claim Status</Link></li>
                <li><Link to="/customer/uploading-suppoting-files">Upload Supporting Files</Link></li>
            </ul>
            <Link to="/logout">Logout</Link>
        </div>
    );
}

export default CustomerDashboard;
