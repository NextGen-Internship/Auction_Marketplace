import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import "./ProfilePage.css";
import { FaCheck, FaEdit } from 'react-icons/fa';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO.ts';
import UserService from '../../Services/UserService.ts';
import ApiService from '../../Services/ApiService.ts';
import Navbar from '../../components/Navbar/Navbar.tsx';
import PaymentHistoryForm from './PaymentHistoryForm.tsx';

const apiService = new ApiService;
const userService = new UserService(apiService);
const allowedFileTypes = ['image/jpeg', 'image/png'];

const ProfilePage: React.FC = () => {
    const token = getToken();

    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | undefined>(undefined);
    const [, setPreviewUrl] = useState<string | null>(null);
    const [email] = useState('');
    const [showHistory,setShowHistory] = useState(false);
    const [hideProfile, setHideProfile] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        userId,
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: ''
    });

    const fetchPaymentHistory = async () => {
        try {
            if (token) {
                const paymentHistoryData = await userService.fetchPaymentHistory();
                setPaymentHistory(paymentHistoryData)
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
        }
    };


    useEffect(() => {
        const saveTokenOnUnload = () => {
            const token = getToken();
            if (token) {
                localStorage.setItem('token', token);
            }
        };
        window.addEventListener('beforeunload', saveTokenOnUnload);
        return () => {
            window.removeEventListener('beforeunload', saveTokenOnUnload);
        };
    }, []);

    useEffect(() => {
        const persistedToken = localStorage.getItem('token');
        if (persistedToken) {
            sessionStorage.setItem('token', persistedToken);
            navigate('/profile');
        }
    }, []);

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
            fetchPaymentHistory();
        }

        if (isTokenExpired()) {
            clearToken();
        }

    }, [token]);

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
                    profilePicture,
                    userId: 0,
                });
                const userData = response.data;
                if (response.succeed) {
                    setUser(userData);
                }
            }
        } catch (error) {
            console.error('Error during profile update:', error);
        } finally {
            setEditMode(false);
            window.location.reload();
        }
    };

    const handleShowHistoryClick = () => {
        setShowHistory(true);
        setHideProfile(true);
    } 

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
            navigate('/profile');
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
                    <h2 className='header-user-form'>{user.firstName}'s Profile</h2>
                    <div className="user-info">
                        <div className="user-avatar">
                            <img src={user.profilePicture} alt="Profile" />

                            {!editMode && (
                                <div className="edit-icons">
                                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                                    <span className="edit-label"></span>
                                </div>
                            )}
                            {editMode && (
                                <div className="edit-icons">
                                    <FaCheck className="save-icon" onClick={handleSaveClick} />
                                </div>

                            )}
                            {editMode && (
                                <label className="edit-icon-label" onClick={handleEditPictureClick}>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        name="profilePicture"
                                        onChange={handleProfilePictureChange}
                                        accept="image/*"
                                    />
                                </label>
                            )}
                        </div>
                        <div className="user-details">
                            <div className="user-detail">
                                <label>First name:</label>
                                {editMode ? (
                                    <input
                                        className='input-user-names'
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSaveClick();
                                            }
                                        }}
                                    />
                                ) : (
                                    <label>{user.firstName}</label>
                                )}
                                {editMode && (
                                    <FaCheck className="save-icon" onClick={handleSaveClick} />
                                )}
                                {!editMode && (
                                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                                )}
                            </div>
                            <div className="user-detail">
                                <label>Last name:</label>
                                {editMode ? (
                                    <input
                                        className='input-user-names'
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSaveClick();
                                            }
                                        }}
                                    />
                                ) : (
                                    <label>{user.lastName}</label>
                                )}
                                {editMode && (
                                    <FaCheck className="save-icon" onClick={handleSaveClick} />
                                )}
                                {!editMode && (
                                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                                )}
                            </div>
                            <div className="user-detail">
                                <label>Email: <span className="edit-label"></span> {user.email}
                                    <span className="edit-label"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='history'>
                        <button className='history-button' onClick={handleShowHistoryClick}>History</button>
                        <PaymentHistoryForm paymentHistory={paymentHistory} />
                    </div>
                </div>
            </form>
            <div className='payment-history-container'>
                <h2 className='header-payment-history-container'> Payment History</h2>
                <table className='table-history'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>IsCompleted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.data}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.isCompleted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfilePage;
