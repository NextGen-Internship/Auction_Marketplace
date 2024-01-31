import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import '../HomePage/HomePage.css'


const AboutUsPage: React.FC = () => {

  const token = getToken();

  useEffect(() => {
    if (isTokenExpired()) {
      clearToken();
    }
  }, []);

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

export default AboutUsPage;
