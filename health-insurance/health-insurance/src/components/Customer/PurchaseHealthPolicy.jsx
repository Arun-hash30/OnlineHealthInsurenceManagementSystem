import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PurchaseHealthPolicy() {
    const [policies, setPolicies] = useState([]);
    const [selectedPolicyId, setSelectedPolicyId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [customerPayment, setCustomerPayment] = useState('');

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customer/policies');
                setPolicies(response.data);
            } catch (error) {
                console.error('Error fetching policies:', error);
            }
        };

        fetchPolicies();
    }, []);

    const handlePurchase = async () => {
        if (selectedPolicyId && customerName && customerEmail && customerAddress && customerPhoneNumber && customerPayment) {
            try {
                const policy = policies.find(p => p.id === parseInt(selectedPolicyId));
                console.log("Selected policy:", policy);  // Log policy details
                if (policy) {
                    const policyToPurchase = {
                        ...policy,
                        customerName,
                        customerEmail,
                        customerAddress,
                        customerPhoneNumber,
                        customerPayment
                    };

                    const response = await axios.post('http://localhost:8080/api/customer/purchase-policy', policyToPurchase);
                    console.log("Response from purchase API:", response.data);
                    alert(`Health Policy "${policy.policyName}" purchased successfully`);
                } else {
                    alert('Selected policy not found');
                }
            } catch (error) {
                console.error('Failed to purchase policy', error);
                alert('Failed to purchase policy');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="container">
            <h2>Purchase Health Policy</h2>
            <select
                value={selectedPolicyId}
                onChange={(e) => setSelectedPolicyId(e.target.value)}
            >
                <option value="">Select a Policy</option>
                {policies.map(policy => (
                    <option key={policy.id} value={policy.id}>
                        {policy.policyName} - ${policy.premium}
                    </option>
                ))}
            </select>
            
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />
            
            <input
                type="email"
                placeholder="Customer Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
            />
             
            <input
                type="text"
                placeholder="Customer Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
            />
             
            <input
                type="text"
                placeholder="Customer Phone Number"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
            />
            
            <label>Customer Payment - transaction details :</label>
            <input
                type="text"
                placeholder="Customer Payment - transaction details"
                value={customerPayment}                
                 onChange={(e) => setCustomerPayment(e.target.value)}    
            />
            

            <button onClick={handlePurchase}>Purchase</button>
        </div>
    );
}

export default PurchaseHealthPolicy;
