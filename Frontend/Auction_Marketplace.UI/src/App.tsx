import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import HomePage from './pages/HomePage/HomePage.tsx';
import { GoogleLogin } from '@react-oauth/google';


function App() {
  return (
      <div>
        <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;
      <div>

        </div>  
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
