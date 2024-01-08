import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";

function App() {
  return (
    <Router>
      <div>  
        <Navbar />
        <Routes>
          <Route path="/login" Component={LoginPage}></Route>
          <Route path="/register" Component={RegisterPage}></Route> 
        </Routes>  
        <Footer /> 
      </div>
   </Router>
  );
}

export default App;
