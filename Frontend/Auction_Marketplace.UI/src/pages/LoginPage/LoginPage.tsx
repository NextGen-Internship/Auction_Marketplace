import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { GoogleLogin } from '@react-oauth/google';
import ApiService from '../../Services/ApiService';
import UserService from '../../Services/UserService';

const apiService = new ApiService();
const userService = new UserService(apiService);

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

  const handleLogin = async () => {
    if (validateEmailOrUsername(emailOrUsername) && validatePassword(password)) {
      try {
        const loginResponse = await apiService.post<any>('api/Authentication/Login', {
          emailOrUsername,
          password,
        });

        console.log('Login response:', loginResponse);

        if (loginResponse.succeed) {
          console.log('Authentication successful');
          //TODO: redirect to dashboard
        } else {
          if(loginResponse.start == 404 && loginResponse.title === 'UserNotFound') {
            console.error('User does not exist.');
            //TODO: Handle case where user doesnt exist
          } else {
            console.error('Authentication failed:', loginResponse.errorMessage);
            //TODO: Handle other auth failure scenarios
          }
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      setEmailOrUsernameError('Invalid email format')
      if (!validatePassword(password)) {
        setPasswordError('Invalid password format. Password should be at least 10 characters and include a combination of numbers, characters, uppercase, and lowercase letters.');
      }
    }
  };


  const handleSuccess = (credentialResponse: any) => {
    console.log('Login success:', credentialResponse);
  };

  const handleError = () => {
    console.log('Login failed.');
  };


  return (
    <div className="login-container">
      <h2>Login in </h2>
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

        <div className='buttons-container'>
          <button type="submit" className="login-btn" onClick={handleLogin}>
            Sign In
          </button>
          <div>
            <GoogleLogin
              width={"230px"}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
        <div>
          <Link to="/register">
            <label className='login-login-label'>
              Don't have an account? Register here.
            </label>
          </Link>
        </div>

      </form>
    </div>
  )
}

export default LoginPage
