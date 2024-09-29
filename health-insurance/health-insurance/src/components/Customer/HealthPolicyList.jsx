import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HealthPolicyList() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customer/policies');
                setPolicies(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch policies', error);
                setError('Failed to load policies');
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    if (loading) return <p>Loading policies...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h2>Available Health Policies</h2>
            <ul>
                {policies.length === 0 ? (
                    <p>No policies available.</p>
                ) : (
                    policies.map(policy => (
                        <li key={policy.id}>
                            <Link to={`/customer/policies/${policy.id}`}>{policy.policyName}</Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default HealthPolicyList;
