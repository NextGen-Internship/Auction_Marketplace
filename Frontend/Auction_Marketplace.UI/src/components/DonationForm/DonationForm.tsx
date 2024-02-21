import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './DonationForm.css';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken';
import { Link } from 'react-router-dom';

interface DonationFormProps {
  onClose: () => void;
  causeId: number | undefined;
}

const DonationForm: React.FC<DonationFormProps> = ({ onClose, causeId }) => {

  const token = getToken();
  const [email, setEmail] = useState<string>(''); // State for storing the email

  useEffect(() => {
    if (isTokenExpired()) {
      clearToken();
    } else {
      // Decode JWT and extract email
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
    }
  }, [token]);

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

  const [donationAmount, setDonationAmount] = useState<number | null>(null);

  const handleAmountButtonClick = (amount: number) => {
    setDonationAmount(amount);
  };

  const handleCustomAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const customAmount = parseFloat(event.target.value);
    setDonationAmount(isNaN(customAmount) ? null : customAmount);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:7141/api/CheckoutApi/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          causeId: causeId,
          amount: donationAmount,
          email: email // Include the email from JWT
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        const redirectUrl = responseData.returnUrl;
        console.log('Checkout session created successfully');
        window.location.href = redirectUrl;
      } else {
        console.error('Error creating checkout session');
      }
    } catch (error) {
      console.error('An error occurred while making the request', error);
    }
  };

  return (
    <div className="donation-form-container">
      <div className="donation-form">
        <h3>Make a Donation</h3>
        <div className="donation-amount-buttons">
          <button onClick={() => handleAmountButtonClick(10)}>10</button>
          <button onClick={() => handleAmountButtonClick(20)}>20</button>
          <button onClick={() => handleAmountButtonClick(50)}>50</button>
          <button onClick={() => handleAmountButtonClick(100)}>100</button>
          <button onClick={() => handleAmountButtonClick(150)}>150</button>
          <button onClick={() => handleAmountButtonClick(200)}>200</button>
        </div>
        <div className="custom-amount-input">
          <input
            className='money'
            type="number"
            placeholder="Enter custom amount"
            value={donationAmount !== null ? donationAmount : ''}
            onChange={handleCustomAmountChange}
          />
        </div>
        <div className='buttons'>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="checkout-button">Checkout</button>
          </form>
          <button className='close-btn' onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
};

export default DonationForm;