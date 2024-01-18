import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/NavbarUser';
import { getToken } from '../../utils/AuthUtil';
import '../../Components/TokenExp/TokenExpContainer.css';

const Marketplace: React.FC = () => {
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
            <Navbar />
        </div>
    );
};

export default Marketplace;
