import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function HealthPolicyDetails() {
    const { id } = useParams();
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/customer/policies/${id}`);
                setPolicy(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch policy details', error);
                setError('Failed to load policy details');
                setLoading(false);
            }
        };

        fetchPolicyDetails();
    }, [id]);

    if (loading) return <p>Loading policy details...</p>;
    if (error) return <p>{error}</p>;
    if (!policy) return <p>No policy found.</p>;

    return (
        <div className="container">
            <h2>Health Policy Details</h2>
            <table className="policy-details-table">
                <tbody>
                    <tr>
                        <td><strong>Policy Name:</strong></td>
                        <td>{policy.policyName}</td>
                    </tr>
                    <tr>
                        <td><strong>Coverage Amount:</strong></td>
                        <td>{policy.coverageAmount ? `$${policy.coverageAmount.toFixed(2)}` : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td><strong>Premium:</strong></td>
                        <td>{policy.premium ? `$${policy.premium.toFixed(2)}` : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td><strong>Description:</strong></td>
                        <td>{policy.description}</td>
                    </tr>
                    <tr>
                        <td><strong>Provider Network:</strong></td>
                        <td>{policy.providerNetwork}</td>
                    </tr>
                    <tr>
                        <td><strong>Start Date:</strong></td>
                        <td>{policy.startDate ? new Date(policy.startDate).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td><strong>End Date:</strong></td>
                        <td>{policy.endDate ? new Date(policy.endDate).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default HealthPolicyDetails;
