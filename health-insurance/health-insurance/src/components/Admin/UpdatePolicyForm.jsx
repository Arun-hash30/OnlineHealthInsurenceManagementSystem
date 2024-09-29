import React, { useState } from 'react';

function UpdatePolicyForm({ policy, onUpdate, onClose }) {
    const [updatedPolicy, setUpdatedPolicy] = useState({ ...policy });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPolicy({ ...updatedPolicy, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedPolicy);
    };

    return (
        <div className="update-policy-form">
            <h3>Update Policy</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Policy Name:
                    <input type="text" name="policyName" value={updatedPolicy.policyName} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={updatedPolicy.description} onChange={handleChange} required />
                </label>
                <label>
                    Premium:
                    <input type="number" name="premium" value={updatedPolicy.premium} onChange={handleChange} required />
                </label>
                <label>
                    Coverage Amount:
                    <input type="number" name="coverageAmount" value={updatedPolicy.coverageAmount} onChange={handleChange} required />
                </label>
                <label>
                    Deductible:
                    <input type="number" name="deductible" value={updatedPolicy.deductible} onChange={handleChange} required />
                </label>
                <label>
                    Coverage Details:
                    <textarea name="coverageDetails" value={updatedPolicy.coverageDetails} onChange={handleChange} required />
                </label>
                <label>
                    Provider Network:
                    <input type="text" name="providerNetwork" value={updatedPolicy.providerNetwork} onChange={handleChange} required />
                </label>
                <button type="submit">Update Policy</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
export default UpdatePolicyForm;