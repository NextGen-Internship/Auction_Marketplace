import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/AuthUtil';
import '../../Components/TokenExp/TokenExpContainer.css';
import Navbar from '../../Components/Navbar/Navbar';

const AuctionsPage: React.FC = () => {
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

    return (
        <div>
        <Navbar showAuthButtons={false} />
    </div>
    );
};

export default AuctionsPage;
