import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { GoogleLogin } from '@react-oauth/google';
import ApiService from '../../Services/ApiService';
import Navbar from '../../Components/Navbar/NavbarLogin';

const apiService = new ApiService();

const LoginPage: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrUsernameError, setEmailOrUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  localStorage.clear();

  const validateEmailOrUsername = (input: string) => {
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
          email: emailOrUsername,
          password,
        });

        console.log('Login response:', loginResponse);

        if (loginResponse.succeed) {
          console.log('Authentication successful');
          localStorage.setItem('token', loginResponse.data);
          navigate('/home');
        } else {
          if (loginResponse.start == 404 && loginResponse.title === 'UserNotFound') {
            console.error('User does not exist.');
            //TODO: Handle case where user doesnt exist
          } else {
            console.error('Authentication failed:', loginResponse.errorMessage);
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

  const handleGoogleLogin = async (credentialResponse: any) => {
    console.log('Google Login success:', credentialResponse);
    try {
      const loginResponse = await apiService.post<any>('api/Authentication/google-login', {
        googleToken: credentialResponse.accessToken,
      });

      if (loginResponse.succeed) {
        console.log('Authentication successful');
        localStorage.setItem('token', loginResponse.data);
        navigate('/home');
      } else {
        if (loginResponse.status === 404 && loginResponse.title === 'UserNotFound') {
          console.error('User does not exist.');

          const createUserResponse = await apiService.post<any>('api/Authentication/Login', {
            email: credentialResponse.profile.email,
          });
          if (createUserResponse.succeed) {
            console.log('User created successfully. Logging in...');
            navigate('/home');
          } else {
            console.error('User creation failed:', createUserResponse.errorMessage);
          }
        } else {
          console.error('Authentication failed:', loginResponse.errorMessage);
        }
      }
    } catch (error) {
      console.error('Error during Google Authentication:', error);
      alert('Error during Google Authentication');
    }
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  /* Standart handle for google login without sending to backend
  const handleSuccess = (credentialResponse: any) => {
    console.log('Login success:', credentialResponse);
  };
  */

  const handleError = () => {
    console.log('Login failed.');
  };

  return (
    <div className="login-container">
      <Navbar />
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
          onKeyDown={handleKeyDownEnter}
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
          onKeyDown={handleKeyDownEnter}
          required
        />
        {passwordError && <span className="error-message">{passwordError}</span>}

        <label htmlFor='forgotPassword' className='forgot-password'>
          Forgot Password
        </label>

        <div className='buttons-container'>
          <button type="button" className="login-btn" onClick={handleLogin}>
            Sign In
          </button>
          <div>
            <GoogleLogin
              width={"230px"}
              onSuccess={handleGoogleLogin}
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
