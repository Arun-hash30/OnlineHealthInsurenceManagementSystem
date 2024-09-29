import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClientList() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/customer/policies')
            .then(response => response.json())
            .then(data => {
                // Transform the data to match client format
                const transformedClients = data.map(policy => ({
                    id: policy.id,
                    name: policy.customerName,
                }));
                setClients(transformedClients);
            })
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    return (
        <div className="container">
            <h2>Client List</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        <Link to={`/agent/clients/${client.id}`}>{client.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientList;
