import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthClaimStatus = () => {
    const [claimNumbers, setClaimNumbers] = useState([]);
    const [selectedClaimNumber, setSelectedClaimNumber] = useState('');
    const [claim, setClaim] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClaimNumbers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customer/claims');
                setClaimNumbers(response.data);
            } catch (error) {
                console.error('Error fetching claim numbers:', error);
                setError('Failed to retrieve claim numbers.');
            }
        };
        
        fetchClaimNumbers();
    }, []);

    const handleCheckStatus = async () => {
        if (selectedClaimNumber) {
            try {
                const response = await axios.get(`http://localhost:8080/api/customer/claims/by-number/${selectedClaimNumber}`);
                setClaim(response.data);
                setError('');
            } catch (error) {
                setError('Failed to retrieve claim status. Please check the claim number and try again.');
                setClaim(null);
            }
        } else {
            setError('Please select a claim number');
        }
    };

    return (
        <div className="container">
            <h2>Check Health Claim Status</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCheckStatus(); }} className="claim-form">
                <div className="form-group">
                    <label htmlFor="claim-select">Select Claim Number:</label>
                    <select
                        id="claim-select"
                        value={selectedClaimNumber}
                        onChange={(e) => setSelectedClaimNumber(e.target.value)}
                    >
                        <option value="">Select a Claim Number</option>
                        {claimNumbers.map(claimNumber => (
                            <option key={claimNumber} value={claimNumber}>
                                {claimNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Check Status</button>
            </form>
            {claim && (
                <div className="claim-details">
                    <h3>Claim Details</h3>
                    <p><strong>Claim Number:</strong> {claim.claimNumber}</p>
                    <p><strong>Status:</strong> {claim.status}</p>
                    <p><strong>Claim ID:</strong> {claim.id}</p>
                    <p><strong>Date of Claim:</strong> {new Date(claim.dateOfClaim).toLocaleDateString()}</p>
                    <p><strong>Claim Amount:</strong> ${claim.claimAmount.toFixed(2)}</p>
                    <p><strong>Hospital Name:</strong> {claim.hospitalName}</p>
                    <p><strong>Hospital Address:</strong> {claim.hospitalAddress}</p>
                    <p><strong>Treatment Date:</strong> {new Date(claim.treatmentDate).toLocaleDateString()}</p>
                    <p><strong>Treatment Details:</strong> {claim.treatmentDetails}</p>
                    <p><strong>Claim Details:</strong> {claim.claimDetails}</p>
                    {claim.approvalDetails && <p><strong>Approval Details:</strong> {claim.approvalDetails}</p>}
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <style>{`
                .container {
                    padding: 20px;
                }
                .claim-form {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    margin-right: 20px;
                }
                .form-group label {
                    margin-bottom: 5px;
                }
                select {
                    padding: 8px;
                    font-size: 16px;
                }
                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .claim-details {
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );
};

export default HealthClaimStatus;
