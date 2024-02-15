import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../../Components/Navbar/Navbar.tsx';


const HeartPage: React.FC = () => {
  const token = getToken();
  const navigate = useNavigate();

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
      navigate('/home');
    }
  }, []);

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

export default HeartPage;