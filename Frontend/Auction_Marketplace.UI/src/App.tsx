import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import Footer from './components/Footer/Footer.tsx';
import MarketplacePage from './pages/MarketplacePage/MarketplacePage.tsx';

function App() {
  return (
    <div>
      <Router>
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
