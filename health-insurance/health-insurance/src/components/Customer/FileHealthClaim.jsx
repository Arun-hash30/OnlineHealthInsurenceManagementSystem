import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileHealthClaim() {
    const [dateOfClaim, setDateOfClaim] = useState('');
    const [claimDetails, setClaimDetails] = useState('');
    const [claimAmount, setClaimAmount] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddress, setHospitalAddress] = useState('');
    const [treatmentDate, setTreatmentDate] = useState('');
    const [treatmentDetails, setTreatmentDetails] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [error, setError] = useState(null);
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customer/policies');
                if (response.data && Array.isArray(response.data)) {
                    setPolicies(response.data);
                } else {
                    setPolicies([]);
                    setError('No policies found');
                }
            } catch (error) {
                console.error('Error fetching policies:', error);
                setError('Error fetching policies. Please try again.');
            }
        };
        fetchPolicies();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const claim = {
            dateOfClaim,
            claimDetails,
            claimAmount,
            hospitalName,
            hospitalAddress,
            treatmentDate,
            treatmentDetails,
            policyNumber
        };

        try {
            await axios.post('http://localhost:8080/api/customer/claims', claim);
            setDateOfClaim('');
            setClaimDetails('');
            setClaimAmount('');
            setHospitalName('');
            setHospitalAddress('');
            setTreatmentDate('');
            setTreatmentDetails('');
            setPolicyNumber('');
            alert('Claim filed successfully');
        } catch (error) {
            console.error('Error filing claim:', error);
            setError('Error filing claim. Please try again.');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Center vertically
                padding: '20px',
                backgroundColor: '#f4f4f4'
            }}
        >
            <div className="side-by-side" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', maxWidth: '1200px', width: '100%' }}>
                {/* Claim Form */}
                <div
                    className="form-container"
                    style={{
                        flex: '1',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff',
                        maxHeight: '500px',
                        overflowY: 'auto'
                    }}
                >
                    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>File a Health Claim</h1>
                    {error && <p className="notification" style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit} style={{ fontSize: '14px' }}>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Date of Claim</h2>
                            <input
                                className="medium-input"
                                type="date"
                                value={dateOfClaim}
                                onChange={(e) => setDateOfClaim(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                        </div>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Claim Details</h2>
                            <textarea
                                className="medium-textarea"
                                value={claimDetails}
                                onChange={(e) => setClaimDetails(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%', height: '60px' }}
                            />
                        </div>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Claim Amount</h2>
                            <input
                                className="medium-input"
                                type="number"
                                value={claimAmount}
                                onChange={(e) => setClaimAmount(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                        </div>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Hospital Name</h2>
                            <input
                                className="medium-input"
                                type="text"
                                value={hospitalName}
                                onChange={(e) => setHospitalName(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                        </div>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Hospital Address</h2>
                            <input
                                className="medium-input"
                                type="text"
                                value={hospitalAddress}
                                onChange={(e) => setHospitalAddress(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                        </div>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Treatment Date</h2>
                            <input
                                className="medium-input"
                                type="date"
                                value={treatmentDate}
                                onChange={(e) => setTreatmentDate(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                        </div>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Treatment Details</h2>
                            <textarea
                                className="medium-textarea"
                                value={treatmentDetails}
                                onChange={(e) => setTreatmentDetails(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%', height: '60px' }}
                            />
                        </div>
                        <div className="form-group">
                            <h2 style={{ fontSize: '16px' }}>Policy Number</h2>
                            <input
                                className="medium-input"
                                type="text"
                                value={policyNumber}
                                onChange={(e) => setPolicyNumber(e.target.value)}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                        </div>
                        <button type="submit" style={{ padding: '10px 20px', fontSize: '14px' }}>Submit Claim</button>
                    </form>
                </div>

                {/* Policy List */}
                <div
                    className="policy-list"
                    style={{
                        flex: '1',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff',
                        maxHeight: '500px',
                        overflowY: 'auto'
                    }}
                >
                    <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Available Policies</h2>
                    {policies.length > 0 ? (
                        <ul style={{ padding: '10px' }}>
                            {policies.map((policy) => (
                                <li key={policy.id} style={{ fontSize: '14px', marginBottom: '10px', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                                    <strong>Policy Number:</strong> {policy.policyNumber} <br />
                                    <strong>Policy Name:</strong> {policy.policyName}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No policies available</p>
                    )}
                </div>
            </div>  
        </div>
    );
}

export default FileHealthClaim;
