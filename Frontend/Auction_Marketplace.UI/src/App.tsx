import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import Navbar from "./Components/Navbar/Navbar.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.tsx";
import HomePage from './Pages/HomePage/HomePage.tsx';


function App() {
  return (
    <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" Component={LoginPage}></Route>
            <Route path="/register" Component={RegisterPage}></Route> 
            <Route path="/" Component={HomePage}></Route>
          </Routes>  
          <Footer /> 
        </Router>
      </div>
  );
}

export default App;
