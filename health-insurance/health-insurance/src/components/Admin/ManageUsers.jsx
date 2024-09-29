import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Fetch users on component load
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users. Please try again.');
            }
        };

        fetchUsers();
    }, []);

    // Handle delete user functionality
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId)); // Update the users after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Manage Users</h2>
            {error && <p className="notification">{error}</p>}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style>{`
                .container {
                    padding: 20px;
                }
                .notification {
                    color: red;
                    margin-bottom: 10px;
                }
                .user-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .user-table th, .user-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .user-table th {
                    background-color: #f2f2f2;
                }
                .delete-btn {
                    border: none;
                    background-color: transparent;
                    cursor: pointer;
                    color: red;
                }
                .delete-btn:hover {
                    color: darkred;
                }
            `}</style>
        </div>
    );
}

export default ManageUsers;
