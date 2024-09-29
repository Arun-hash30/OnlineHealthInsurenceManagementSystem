import React, { useState } from 'react';
import axios from 'axios';

function RenewHealthPolicy() {
    const [policyNumber, setPolicyNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleRenew = async () => {
        if (policyNumber) {
            setLoading(true);
            setError(null);
            setSuccessMessage('');
    
            try {
                await axios.post('http://localhost:8080/api/customer/renew-policy', { policyNumber });
                setSuccessMessage(`Health Policy "${policyNumber}" renewed successfully`);
            } catch (error) {
                console.error('Error renewing policy:', error.response?.data || error.message);
                setError(error.response?.data || 'Failed to renew policy');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please enter your health policy number');
        }
    };    

    return (
        <div className="container">
            <h2>Renew Health Policy</h2>
            <input
                type="text"
                placeholder="Policy Number"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
            />
            <button onClick={handleRenew} disabled={loading}>
                {loading ? 'Renewing...' : 'Renew'}
            </button>
            {successMessage && <p>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default RenewHealthPolicy;
