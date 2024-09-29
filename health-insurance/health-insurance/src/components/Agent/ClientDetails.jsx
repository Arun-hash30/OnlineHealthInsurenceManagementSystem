import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ClientDetails() {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/customer/policies/${id}`)
            .then(response => response.json())
            .then(data => {
                setClient({
                    name: data.customerName,
                    policies: data.policies || [data.policyName], // Handle multiple policies if available
                });
            })
            .catch(error => console.error('Error fetching client details:', error));
    }, [id]);

    if (!client) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Client Details</h2>
            <div className="client-details">
                <table>
                    <tbody>
                        <tr>
                            <th>Client Name</th>
                            <td>{client.name}</td>
                        </tr>
                        <tr>
                            <th>Policies</th>
                            <td>
                                <table className="policy-table">
                                    <thead>
                                        <tr>
                                            <th>Policy Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {client.policies.map((policy, index) => (
                                            <tr key={index}>
                                                <td>{policy}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style>{`
                .container {
                    padding: 20px;
                }
                .client-details table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                .client-details th, .client-details td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .client-details th {
                    background-color: #f2f2f2;
                }
                .policy-table {
                    width: 100%;
                    border: none;
                    margin-top: 10px;
                }
                .policy-table th, .policy-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                .policy-table th {
                    background-color: #f2f2f2;
                }
            `}</style>
        </div>
    );
}

export default ClientDetails;
