import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './HomePage.css'
import firstPhoto from '/src/assets/5-Reasons-Why-You-Should-Donate-to-Charity.jpg';
import secondPhoto from '/src/assets/1140-donation-box.jpg';
import thirdPhoto from '/src/assets/donate-2.jpg';
import forthPhoto from '/src/assets/gettyimages-1189942849_900xx2121-1193-0-111.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import Navbar from '../../components/Navbar/Navbar.tsx';


const HomePage: React.FC = () => {
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

  const images = [
    firstPhoto,
    secondPhoto,
    thirdPhoto,
    forthPhoto
  ];

  const carouselSettings = {
    showThumbs: false,
    interval: 4000, 
    infiniteLoop: true,
    autoPlay: true,
    transitionTime: 500,
    stopOnHover: false,
    dynamicHeight: false,
  };



  return (
    <div>
      <Navbar showAuthButtons={false} />
      <div className="header-menu">
        <h1>Welcome to the Blankfactor Marketplace</h1>
        <p>Buy or donate items for a good cause!</p>
       <Carousel {...carouselSettings}>
         {images.map((imageUrl, index) => (
           <div key={index}>
               <img src={imageUrl} alt={`Photo ${index + 1}`} />
           </div>
          ))}
      </Carousel>
        <div className="description">
      </div>
      </div>
    </div>
  );
};

export default HomePage;