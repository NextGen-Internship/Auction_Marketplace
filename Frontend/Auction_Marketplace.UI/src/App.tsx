import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.tsx";
import HomePage from './Pages/HomePage/HomePage.tsx';
import MarketplacePage from './Pages/MarketplacePage/MarketplacePage.tsx';
import Navbar from './Components/Navbar/Navbar.tsx';

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
          <Route path="/marketplace" element={<MarketplacePage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
