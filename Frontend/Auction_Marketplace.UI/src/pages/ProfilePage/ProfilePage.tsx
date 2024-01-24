import React from 'react';
import { Link } from 'react-router-dom';
import { getToken, getUserFromCredentials} from '../../utils/AuthUtil';
import '../../Components/TokenExp/TokenExpContainer.css';
import Navbar from '../../Components/Navbar/Navbar';
import './ProfilePage.css';
import profilePicture from "../../assets/profilePicture.jpg";

const ProfilePage: React.FC = () => {
    const token = getToken();
    if (!token) {
        return (
            <div className='token-exp-container'>
                <div className='token-exp-content'>
                    <p>Please log in to access this page.</p>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        );
    }

    const user = getUserFromCredentials(); 

    return (
        <div>
            <Navbar showAuthButtons={false} />
            <div className="profile-page-container">
                <div className="profile-picture-page-container">
                    <img
                        src={profilePicture}
                        alt="Profile"
                        className="profile-picture"
                    />
                </div>
                <div className="profile-info">
                    <div>
                        <strong>First Name:</strong>
                        <p>{user?.firstName}</p> 
                    </div>
                    <div>
                        <strong>Last Name:</strong>
                        <p>{user?.lastName}</p>
                    </div>
                    <div>
                        <strong>Username:</strong>
                        <p>{user?.username}</p>
                    </div>
                    <div>
                        <strong>Phone Number:</strong> 
                        <p>{user?.phoneNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
