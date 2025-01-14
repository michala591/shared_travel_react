import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import TokenContext from '../TokenContext';

function EditUser({ user, getUser, closeModal }) {
    const { login } = useContext(UserContext);
    const { token } = useContext(TokenContext);

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://shared-travel-proj.onrender.com/users/${login.user_id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('User updated successfully!');
            getUser(); // Refresh user data
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user. Please try again.");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit User</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;