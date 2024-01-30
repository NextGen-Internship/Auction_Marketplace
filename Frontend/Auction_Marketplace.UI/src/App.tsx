import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar.tsx';
import LoginPage from './Pages/LoginPage/LoginPage.tsx';
import HomePage from './Pages/HomePage/HomePage.tsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage.tsx';
import Footer from './Components/Footer/Footer.tsx';
import AuctionsPage from './Pages/AuctionsPage/AuctionsPage.tsx';
import CausesPage from './Pages/CausesPage/CausesPage.tsx';
import ProfilePage from './Pages/ProfilePage/ProfilePage.tsx';
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage.tsx';


function App() {
  return (
    <div>
      <img src="/Users/Teoslava.Yordanova/Downloads/%2FHidden_Resources%2FUsers%2Fwsedrf@abv.bg%2FProfilePicture%2Fwsedrf@abv.bg%2FProfilePicture" alt="" />
      <Router>
        <Navbar showAuthButtons={true} />
        <Routes>
          <Route path="/login" Component={LoginPage}></Route>
          <Route path="/register" Component={RegisterPage}></Route>
          <Route path="/" element={<LoginPage />} ></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/auctions" element={<AuctionsPage />}></Route>
          <Route path="/causes" element={<CausesPage />}></Route>
          <Route path="/aboutUs" element={<AboutUsPage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
