import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdatePolicyForm from './UpdatePolicyForm';

function ManageHealthPolicies() {
    const [policies, setPolicies] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPolicy, setSelectedPolicy] = useState(null); // Added for update
    const [showUpdateForm, setShowUpdateForm] = useState(false); // Manage form visibility

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customer/policies');
                setPolicies(response.data);
            } catch (error) {
                setError('Failed to fetch policies');
                console.error('Failed to fetch policies', error);
            }
        };

        fetchPolicies();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/${id}`);
            setPolicies(policies.filter(policy => policy.id !== id));
        } catch (error) {
            setError('Failed to delete policy');
            console.error('Failed to delete policy', error);
        }
    };

    const handleUpdate = async (updatedPolicy) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/admin/${updatedPolicy.id}`, updatedPolicy);
            setPolicies(policies.map(policy => policy.id === updatedPolicy.id ? response.data : policy));
            setShowUpdateForm(false); // Close the form after updating
        } catch (error) {
            setError('Failed to update policy');
            console.error('Failed to update policy', error);
        }
    };

    return (
        <div className="container">
            <h2>Manage Health Policies</h2>
            {error && <p className="error">{error}</p>}
            {showUpdateForm && (
                <UpdatePolicyForm
                    policy={selectedPolicy}
                    onUpdate={handleUpdate}
                    onClose={() => setShowUpdateForm(false)}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Policy Number</th>
                        <th>Policy Name</th>
                        <th>Description</th>
                        <th>Premium</th>
                        <th>Coverage Amount</th>
                        <th>Deductible</th>
                        <th>Coverage Details</th>
                        <th>Provider Network</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map(policy => (
                        <tr key={policy.id}>
                            <td>{policy.policyNumber}</td>
                            <td>{policy.policyName}</td>
                            <td>{policy.description}</td>
                            <td>${policy.premium.toFixed(2)}</td>
                            <td>${policy.coverageAmount.toFixed(2)}</td>
                            <td>${policy.deductible.toFixed(2)}</td>
                            <td>{policy.coverageDetails}</td>
                            <td>{policy.providerNetwork}</td>
                            <td>{new Date(policy.startDate).toLocaleDateString()}</td>
                            <td>{new Date(policy.endDate).toLocaleDateString()}</td>
                            <td>
                                <button 
                                    onClick={() => {
                                        setSelectedPolicy(policy);
                                        setShowUpdateForm(true);
                                    }}
                                    className="icon-button"
                                    title="Edit Policy"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(policy.id)}
                                    className="icon-button"
                                    title="Delete Policy"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageHealthPolicies;
