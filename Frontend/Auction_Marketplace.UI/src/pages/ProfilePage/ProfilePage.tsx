import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.tsx';
import { getToken } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import "./ProfilePage.css";
import { FaEdit } from 'react-icons/fa';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO.ts';
import UserService from '../../Services/UserService.ts';
import ApiService from '../../Services/ApiService.ts';

const apiService = new ApiService;
const userService = new UserService(apiService);

const ProfilePage: React.FC = () => {
    const token = getToken();

    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [email] = useState('');

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: ''
    });

    const fetchUserProfile = async () => {
        try {
            if (token) {
                const response: ApiResponseDTO = await userService.fetchUser();
                const userData = response.data;
                if (response.succeed) {
                    setUser(userData);
                }
            }
        } catch (error) {
            console.error('Error during user profile fetch:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        }
    }, [token]
    );

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        setEditMode(false);
        try {
            if (token) {
                const response: ApiResponseDTO = await userService.updateUser(user);
                const userData = response.data;
                if (response.succeed) {
                    setUser(userData);
                }
            }
        } catch (error) {
            console.error('Error during profile update:', error);
        } finally {
            setEditMode(false);
        }
    };

    if (!token) {
        return (
            <div className='token-exp-container'>
                <div className='token-exp-content'>
                    <p>Please log in to access this page.</p>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Navbar showAuthButtons={false} />
            <form>
                <div className='profile-container'>
                    <h2>User Profile</h2>
                    <div className="user-info">
                        <div className="user-avatar">
                            <img src={user.profilePicture} alt="Profile" />
                        </div>
                        <div className="user-details">
                            <div className="user-detail">
                                <label>First name:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                ) : (
                                    <p>{user.firstName}</p>
                                )}
                                {editMode && (
                                    <FaEdit className="edit-icon" onClick={handleSaveClick} />
                                )}
                                {!editMode && (
                                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                                )}
                            </div>
                            <div className="user-detail">
                                <label>Last name:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                ) : (
                                    <p>{user.lastName}</p>
                                )}
                                {editMode && (
                                    <FaEdit className="edit-icon" onClick={handleSaveClick} />
                                )}
                                {!editMode && (
                                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                                )}
                            </div>
                            <div className="user-detail">
                                <label>Email: {user.email}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
