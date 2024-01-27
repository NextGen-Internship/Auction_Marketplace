import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.tsx';
import { getToken } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './HomePage.css'


const AboutUsPage: React.FC = () => {
 /* const token = getToken();
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

  */

  return (
    <div>
      <Navbar showAuthButtons={false} />
    </div>
  );
};

export default AboutUsPage;
