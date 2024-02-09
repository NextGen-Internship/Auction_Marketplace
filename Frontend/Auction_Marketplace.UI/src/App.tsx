import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './Pages/StripePage/Payment.tsx';
import Completion from './Pages/StripePage/Completion.tsx';
import AuctionDetailsPage from './Pages/AuctionDetailsPage/AuctionDetailsPage.tsx';
import CausePage from './Pages/CausesPage/CausePage.tsx';
import AuctionsPage from './Pages/AuctionsPage/AuctionsPage.tsx';
import AuctionPage from './Pages/AuctionsPage/AuctionPage.tsx';
import LoginPage from './Pages/LoginPage/LoginPage.tsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage.tsx';
import HomePage from './Pages/HomePage/HomePage.tsx';
import ProfilePage from './Pages/ProfilePage/ProfilePage.tsx';
import CausesPage from './Pages/CausesPage/CausesPage.tsx';
import CauseDetailsPage from './Pages/CauseDetailsPage/CauseDetailsPage.tsx';
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage.tsx';
import Footer from './Components/Footer/Footer.tsx';
import Navbar from './Components/Navbar/Navbar.tsx';

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
          <Route path="/payment" element={<Payment/>}></Route>
          <Route path="/completion" element={<Completion/>}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/auctions" element={<AuctionsPage />}></Route>
          <Route path="/auctions/details/:auctionId" element={<AuctionDetailsPage />} />
          <Route path="/causes" element={<CausesPage />}></Route>
          <Route path="/causes/details/:causeId" element={<CauseDetailsPage />} />
          <Route path="auction/:auctionId" element={<AuctionPage />}/>
          <Route path="cause/:causeId" element={<CausePage/>}/>
          <Route path="/aboutUs" element={<AboutUsPage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;




        