import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../pages/LoginPage/LoginPage.css'; 
import '../../pages/LoginPage/LoginPageSignInWithGoogle.css';


const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setFirstNameError] = useState<string | null>(null);
  const [, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (input: string) => {
    //  must start with one or more characters that are not whitespace or '@'
    // There must be an '@' symbol after the initial characters.
    //  After the '@' symbol, there should be one or more characters that are not whitespace or '@'.
    // Following the second set of characters, there must be a dot ('.') symbol.
    // Finally, after the dot, there should be one or more characters that are not whitespace or '@' until the end of the string.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePassword = (input: string) => {
    // Password should be at least 10 characters and include a combination of numbers, characters, uppercase, and lowercase letters
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{10,}$/;
    return passwordRegex.test(input);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFirstName(inputValue);
    setFirstNameError(inputValue);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLastName(inputValue);
    setLastNameError(inputValue);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setEmailError(validateEmail(inputValue) ? null : 'Invalid email or username format');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    setPasswordError(validatePassword(inputValue) ? null : 'Invalid password format');
  };

  const handleLogin = () => {
    if (validateEmail(email) && validatePassword(password)) {
      //TODO  authentication logic here
      console.log('First name:', firstName);
      console.log('Last name:', lastName);
      console.log('Email/Username:', email);
      console.log('Password:', password);
    } else {
      setEmailError('Invalid email or username format')
      if (!validatePassword(password)) {
        setPasswordError('Invalid password format. Password should be at least 10 characters and include a combination of numbers, characters, uppercase, and lowercase letters.');
      }
    }
  };
  

  return (
    <div className="login-container">
      <h2>Register in to Blankfactor Auction Marketplace</h2>
      <form>

        <label htmlFor="firstName"></label>
        <input
          type="firstName"
          id="firstName"
          name="firstName"
          placeholder='First Name'
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />

        <label htmlFor="lastName"></label>
        <input
          type="lastName"
          id="lastName"
          name="lastName"
          placeholder='Last Name'
          value={lastName}
          onChange={handleLastNameChange}
          required
        />

        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <span className="error-message">{emailError}</span>}

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

        <button type="submit" className="login-btn" onClick={handleLogin}>
          Create Account
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
            <span className="gsi-material-button-contents">Create Account with Google</span>
            <span style={{ display: 'none' }}>Create Account with Google</span>
          </div>
        </button>

        <label className='register-login-label'>
            You have a profile? Sign in here.
        </label>

        <Link to="/login">
          <button type="submit" className="login-btn">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
