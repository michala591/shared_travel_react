import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import TokenContext from '../TokenContext';
import { useNavigate } from 'react-router-dom';
import EditUser from './EditUser';

function SettingUser() {
    const { login } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const getUser = async () => {
        if (!login?.user_id || !token) return; // Ensure login and token are available
        try {
            const response = await axios.get(`https://shared-travel-proj.onrender.com/users/${login.user_id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setError("Failed to fetch user details. Please try again.");
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        getUser();
    }, [login?.user_id, token]);

    const openEditModal = (user) => {
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
    };
    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData ? (
                <>
                    <div>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Name:</strong> {userData.name}</p>
                    </div>
                    <div>
                        <button className="btn-custom btn-warning" onClick={openEditModal}>Edit Details</button>
                    </div>
                </>

            ) : (
                <p>Loading user details...</p>
            )}
            {isEditing && (
                <EditUser
                    user={userData}
                    getUser={getUser}
                    closeModal={closeEditModal}
                />
            )}
        </div>
    );
}

export default SettingUser;
