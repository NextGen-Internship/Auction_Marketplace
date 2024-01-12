import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../pages/LoginPage/LoginPage.css'; 
import './ProfilePicture.css';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setFirstNameError] = useState<string | null>(null);
  const [, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const allowedFileTypes = ['image/jpeg', 'image/png'];

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        setProfilePicture(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };

        reader.readAsDataURL(file);
        
      } else {
          setProfilePicture(null);
          setPreviewUrl(null);
          alert('Invalid file type. Please upload a JPEG or PNG image.');
      }
    } else {
        setProfilePicture(null);
        setPreviewUrl(null);
    }
  };

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePassword = (input: string) => {
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

  const handleLogin = async () => {
    if (validateEmail(email) && validatePassword(password)) {
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
      <h2 className='register-header-container'>
        Register 
      </h2>
      <form>
        <div className='circular-frame'>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleProfilePictureChange}
            accept="image/*"
          />

          {previewUrl && <img src={previewUrl} alt="Profile Preview" className="preview-image" />}
          {!previewUrl && <div className="plus-symbol">+</div>}
        </div>

        <label htmlFor="firstName"></label>
        <input
          type="text"  
          id="firstName"
          name="firstName"
          placeholder='First Name'
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />

        <label htmlFor="lastName"></label>
        <input
          type="text" 
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

        <button type="button" className="login-btn" onClick={handleLogin}>
          Create Account
        </button>

        <Link to="/login">
          <label className='register-login-label'>
              You have a profile? Sign in here.
          </label>
        </Link>

      </form>
    </div>
  );
};

export default RegisterPage;
