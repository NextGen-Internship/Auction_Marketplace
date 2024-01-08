import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; 
import './LoginPageSignInWithGoogle.css';


const LoginPage: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrUsernameError, setEmailOrUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmailOrUsername = (input: string) => {
    //  must start with one or more characters that are not whitespace or '@'
    // There must be an '@' symbol after the initial characters.
    //  After the '@' symbol, there should be one or more characters that are not whitespace or '@'.
    // Following the second set of characters, there must be a dot ('.') symbol.
    // Finally, after the dot, there should be one or more characters that are not whitespace or '@' until the end of the string.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_.]{8,}$/;

    return emailRegex.test(input) || usernameRegex.test(input);
  };

  const validatePassword = (input: string) => {
    // Password should be at least 10 characters and include a combination of numbers, characters, uppercase, and lowercase letters
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{10,}$/;
    return passwordRegex.test(input);
  };

  const handleEmailOrUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmailOrUsername(inputValue);
    setEmailOrUsernameError(validateEmailOrUsername(inputValue) ? null : 'Invalid email or username format');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    setPasswordError(validatePassword(inputValue) ? null : 'Invalid password format');
  };

  const handleLogin = () => {
    if (validateEmailOrUsername(emailOrUsername) && validatePassword(password)) {
      //TODO  authentication logic here
      console.log('Email/Username:', emailOrUsername);
      console.log('Password:', password);
    } else {
      setEmailOrUsernameError('Invalid email or username format')
      if (!validatePassword(password)) {
        setPasswordError('Invalid password format. Password should be at least 10 characters and include a combination of numbers, characters, uppercase, and lowercase letters.');
      }
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login in to Blankfactor Auction Marketplace</h2>
      <form>
        <label htmlFor="emailOrUsername"></label>
        <input
          type="emailOrUsername"
          id="emailOrUsername"
          name="emailOrUsername"
          placeholder='Email or Username'
          value={emailOrUsername}
          onChange={handleEmailOrUsernameChange}
          required
        />
        {emailOrUsernameError && <span className="error-message">{emailOrUsernameError}</span>}

        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <span className="error-message">{passwordError}</span>}

        <label htmlFor='forgotPassword' className='forgot-password'>
          Forgot Password
        </label>

        <button type="submit" className="login-btn" onClick={handleLogin}>
          Sign In
        </button>

        <button type="submit" className="gsi-material-button">
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="gsi-material-button-contents">Sign in with Google</span>
            <span style={{ display: 'none' }}>Sign in with Google</span>
          </div>
        </button>

        <label className='register-login-label'>
            Don't have an account? Register here.
        </label>

        <Link to="/register">
            <button type="submit" className="register-btn">
                Register
            </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
