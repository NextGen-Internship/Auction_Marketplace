import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marketplace from './pages/MarketplacePage/MarketplacePage.tsx';
import Navbar from './Components/Navbar/Navbar.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import Footer from './components/Footer/Footer.tsx';

function App() {
  return (
    <div>
      <Router>
        <Navbar showAuthButtons={true} />
        <Routes>
          <Route path="/login" Component={LoginPage}></Route>
          <Route path="/register" Component={RegisterPage}></Route>
          <Route path="/" element={<LoginPage />} ></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
