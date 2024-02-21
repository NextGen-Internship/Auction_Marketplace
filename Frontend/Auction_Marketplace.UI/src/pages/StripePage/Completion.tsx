import { useEffect } from "react";
import { clearToken, getToken, isTokenExpired } from "../../utils/GoogleToken";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Completion(){
    const token = getToken();

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
  
    return (
        <div>
             <Navbar showAuthButtons={false} />
             <h1>Your payment has been succssesful!</h1>
        </div>
    
    )
}
export default Completion;