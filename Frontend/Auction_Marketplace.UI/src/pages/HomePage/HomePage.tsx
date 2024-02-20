import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './HomePage.css'
import firstPhoto from '/src/assets/Kids in need.png';
import secondPhoto from '/src/assets/Animals.jpeg';
import thirdPhoto from '/src/assets/Ukrainee.jpeg';
import forthPhoto from '/src/assets/human kindness.jpeg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import Navbar from '../../components/Navbar/Navbar.tsx';
import Footer from '../../Components/Footer/Footer.tsx';

const HomePage: React.FC = () => {
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

  const images = [
    firstPhoto,
    secondPhoto,
    thirdPhoto,
    forthPhoto
  ];

  const carouselSettings = {
    showThumbs: false,
    interval: 7000, 
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
      <div className="top-bar">
        <div className="logo">Blankfactor Marketplace</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <div className="user-menu">
          <div className="profile-icon">Profile</div>
        </div>
      </div>
      <Carousel {...carouselSettings}>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Photo ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className="product-section">
        <h2>Auction Products</h2>
        <div className="product-list">
          <div className="product">
            <img src='https://artstreet.in/cdn/shop/products/71S_lfuAyYL_700x700.jpg?v=1680764254' alt="Product 1" />
            <h3>Painting from Picasso</h3>
            <p>Guernica shows the tragedies of war and the suffering it inflicts upon individuals, particularly innocent civilians. This work has gained a monumental status, becoming a perpetual reminder of the tragedies of war, an anti-war symbol, and an embodiment of peace.</p>
          </div>
          <div className="product">
            <img src='https://tincknellcountrystore.co.uk/images/cats/1737.jpg' alt="Product 2" />
            <h3>Truck Toy</h3>
            <p>It’s time to take out the trash with DRIVEN by Battat’s Dump Truck! This toy truck is part of the Standard Series and it is packed with cool features to keep you entertained for hours! There are working sounds so you can honk the horn and rev the engine. You can also switch on the multiple lights to see the path ahead and let others know you’re on the road! Fill your truck up and tilt the garbage out using the movable dumper. </p>
          </div>
          <div className="product">
            <img src='https://bandpassdesign.com/cdn/shop/products/standard_dresden_gaming_set_straight_copy_1.jpg?v=1631024763' alt="Product 3" />
            <h3>Game Dining Table</h3>
            <p>The Dresden Board Game Dining Table makes the most of leisure time while offering a multi-use, space-saving option for both recreation and dining. Whether you want to play popular tabletop games or card games, socialize, or share a meal, Dresden’s modern design and different features have everything you need for a relaxing and memorable experience. </p>
          </div>
        </div>
        <Link to="/auctions" className="view-all-button">View All Products</Link>
      </div>
    </div>
    <Footer />
  </div>
);
};
export default HomePage;