import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { getToken } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import "./ProfilePage.css";
import { FaEdit } from 'react-icons/fa';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO.ts';
import UserService from '../../Services/UserService.ts';
import ApiService from '../../Services/ApiService.ts';

const apiService = new ApiService;
const userService = new UserService(apiService);
const allowedFileTypes = ['image/jpeg', 'image/png'];

const ProfilePage: React.FC = () => {
    const token = getToken();

    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [email] = useState('');

    const navigate = useNavigate();

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
        handleEditPictureClick();
    };

    const handleSaveClick = async () => {
        fetchUserProfile();
        setEditMode(false);
        try {
            if (token) {
                const response: ApiResponseDTO = await userService.updateUser({
                    firstName,
                    lastName,
                    email,
                    profilePicture
                });
                const userData = response.data;
                if (response.succeed) {
                    setUser(userData);
                }
                alert("Refresh page.")
            }
        } catch (error) {
            console.error('Error during profile update:', error);
        } finally {
            setEditMode(false);
        }
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const file = fileInput.files && fileInput.files[0];

        if (file) {
            if (allowedFileTypes.includes(file.type)) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    setProfilePicture(file);
                    setPreviewUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setProfilePicture(undefined);
                setPreviewUrl(null);
                alert('Invalid file type. Please upload a JPEG or PNG image.');
            }
        } else {
            setProfilePicture(undefined);
            setPreviewUrl(null);
        }
    };


    const handleEditPictureClick = () => {
        const fileInput = document.getElementById('user-avatar');
        if (fileInput) {
            fileInput.click();
            navigate('/prfoile');
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
                            {editMode && (
                                <label className="edit-icon-label" onClick={handleEditPictureClick}>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        name="profilePicture"
                                        onChange={handleProfilePictureChange}
                                        accept="image/*"
                                    />
                                    <FaEdit className="edit-icon" onClick={handleSaveClick} />
                                </label>
                            )}
                            {!editMode && (
                                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                                )}
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
