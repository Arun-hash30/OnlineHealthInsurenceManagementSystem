import React, { useState } from 'react';
import axios from 'axios';

function CreatePolicy() {
    const [policy, setPolicy] = useState({
        policyNumber: '',
        policyName: '',
        description: '',
        premium: 0,
        coverageAmount: 0,
        deductible: 0,
        coverageDetails: '',
        providerNetwork: '',
        startDate: '',
        endDate: '',
        active: true,  // Default to true (active)
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPolicy({
            ...policy,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setPolicy({
            ...policy,
            [name]: value === 'Yes' // Convert to boolean
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/admin/create-policies', policy);
            alert('Policy created successfully');
        } catch (error) {
            console.error('Failed to create policy', error);
            alert('Failed to create policy');
        }
    };

    return (
        <div className="container">
            <h2>Create New Policy</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>Policy Number:
                        <input 
                        type="text" 
                        name="policyNumber" 
                        value={policy.policyNumber} 
                        onChange={handleChange} 
                        placeholder="Policy Number" 
                    /> </label>
                    <label>Policy Name:
                    <input 
                        type="text" 
                        name="policyName" 
                        value={policy.policyName} 
                        onChange={handleChange} 
                        placeholder="Policy Name" 
                    /></label>
                    <label>Policy Description:
                    <textarea 
                        name="description" 
                        value={policy.description} 
                        onChange={handleChange} 
                        placeholder="Description" 
                    /></label>
                    <label>Premium:
                    <input 
                        type="number" 
                        name="premium" 
                        value={policy.premium} 
                        onChange={handleChange} 
                        placeholder="Premium" 
                    /></label>
                    <label>Coverage Amount:
                    <input 
                        type="number" 
                        name="coverageAmount" 
                        value={policy.coverageAmount} 
                        onChange={handleChange} 
                        placeholder="Coverage Amount" 
                    /></label>
                    <label>Deductible charges:
                    <input 
                        type="number" 
                        name="deductible" 
                        value={policy.deductible} 
                        onChange={handleChange} 
                        placeholder="Deductible" 
                    /></label>
                    <label>Coverage Details:
                    <textarea 
                        name="coverageDetails" 
                        value={policy.coverageDetails} 
                        onChange={handleChange} 
                        placeholder="Coverage Details" 
                    /></label>
                    <label>Provider Details:
                    <input 
                        type="text" 
                        name="providerNetwork" 
                        value={policy.providerNetwork} 
                        onChange={handleChange} 
                        placeholder="Provider Network" 
                    /></label>
                    <label>Start Date:
                    <input 
                        type="date" 
                        name="startDate" 
                        value={policy.startDate} 
                        onChange={handleChange} 
                    /></label>
                    <label>End Date:
                    <input 
                        type="date" 
                        name="endDate" 
                        value={policy.endDate} 
                        onChange={handleChange} 
                    /></label>
                    <label>
                        Is Active:
                        <select 
                            name="isactive" 
                            value={policy.active ? 'Yes' : 'No'} 
                            onChange={handleSelectChange}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <button type="submit">Create Policy</button>
                </form>
            </div>

            <style>{`
                .container {
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh; /* Center the content vertically */
                }
                .form-container {
                    max-height: 600px; /* Adjust the height as needed */
                    overflow-y: auto;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 600px; /* Set a maximum width */
                }
                form {
                    display: flex;
                    flex-direction: column;
                }
                input, textarea, select {
                    margin-bottom: 10px;
                    padding: 10px;
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
            `}</style>
        </div>
    );
}

export default CreatePolicy;
