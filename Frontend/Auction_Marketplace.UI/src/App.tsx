import Marketplace from './pages/MarketplacePage/MarketplacePage.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import Footer from './components/Footer/Footer.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './pages/StripePage/Payment.tsx';
import Completion from './pages/StripePage/Completion.tsx';
import AuctionsPage from './pages/AuctionsPage/AuctionsPage.tsx';
import CausesPage from './pages/CausesPage/CausesPage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage.tsx';

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
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route path="/payment" element={<Payment/>}></Route>
          <Route path="/completion" element={<Completion/>}></Route>
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




        