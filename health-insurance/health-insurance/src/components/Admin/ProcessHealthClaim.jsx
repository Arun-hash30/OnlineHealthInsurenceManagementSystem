import React, { useState, useEffect } from 'react';

function ProcessHealthClaim() {
    const [claimNumber, setClaimNumber] = useState('');
    const [approvalDetails, setApprovalDetails] = useState('');
    const [error, setError] = useState('');
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        // Fetch all claims when the component mounts
        const fetchClaims = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/agent/claims');
                if (!response.ok) {
                    throw new Error('Failed to fetch claims.');
                }
                const data = await response.json();
                setClaims(data);
            } catch (error) {
                console.error('Error fetching claims:', error);
                setError(error.message);
            }
        };

        fetchClaims();
    }, []);

    const updateClaimStatus = async (status) => {
        try {
            const response = await fetch(`http://localhost:8080/api/agent/claims/by-number/${claimNumber}/${status}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    approvalDetails: approvalDetails,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text(); // Use text() if JSON parsing fails
                console.error('Error response data:', errorData);
                throw new Error(errorData || 'Failed to update claim status. Please check the claim number and try again.');
            }

            // Alert the user and clear the error message
            alert(`Claim "${claimNumber}" has been successfully ${status.toLowerCase()}ed.`);
            setError(''); // Clear any previous errors
            setApprovalDetails(''); // Clear approval details input
            setClaimNumber(''); // Clear the selected claim number

            // Optionally, refresh the list of claims
            const updatedClaims = claims.filter(claim => claim.claimNumber !== claimNumber);
            setClaims(updatedClaims);
        } catch (error) {
            console.error('Error updating claim status:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <div className="side-by-side">
                <div className="form-container">
                    <h2>Process Health Claim</h2>
                    <div className="form-group">
                        <label htmlFor="claimNumber">Claim Number</label>
                        <input
                            type="text"
                            id="claimNumber"
                            placeholder="Enter Claim Number"
                            value={claimNumber}
                            onChange={e => setClaimNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="approvalDetails">Approval Details</label>
                        <textarea
                            id="approvalDetails"
                            placeholder="Enter Approval Details"
                            value={approvalDetails}
                            onChange={e => setApprovalDetails(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button onClick={() => updateClaimStatus('approve')}>Approve</button>
                        <button onClick={() => updateClaimStatus('reject')}>Reject</button>
                    </div>
                    {error && <p className="notification">{error}</p>}
                </div>

                <div className="policy-list">
                    <h2>All Claims</h2>
                    <ul>
    {claims.map(claim => (
        <li key={claim.claimNumber}>
            <strong>Claim Number:</strong> {claim.claimNumber}<br />
            <strong>Status:</strong> {claim.status}<br />
            {/* Check if healthPolicy exists before accessing its properties */}
            {claim.healthPolicy ? (
                <>
                    <strong>Policy Number:</strong> {claim.healthPolicy.policyNumber}<br />
                </>
            ) : (
                <em>No health policy associated</em>
            )}
            <button onClick={() => setClaimNumber(claim.claimNumber)}>Select</button>
        </li>
    ))}
</ul>

                </div>
            </div>
        </div>
    );
}

export default ProcessHealthClaim;
