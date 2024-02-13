import React, { useState } from 'react';
import './DonationForm.css';

interface DonationFormProps {
  onClose: () => void;
  causeId: number | undefined;
}

const DonationForm: React.FC<DonationFormProps> = ({ onClose, causeId }) => {
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
          amount: donationAmount
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
    <div className="donation-form">
      <h3>Donation Form</h3>
      <div className="donation-buttons">
        <button onClick={() => handleAmountButtonClick(10)}>10</button>
        <button onClick={() => handleAmountButtonClick(20)}>20</button>
        <button onClick={() => handleAmountButtonClick(50)}>50</button>
        <button onClick={() => handleAmountButtonClick(100)}>100</button>
        <button onClick={() => handleAmountButtonClick(150)}>150</button>
        <button onClick={() => handleAmountButtonClick(200)}>200</button>
      </div>
      <div className="custom-amount-input">
        <input
          type="number"
          placeholder="Enter custom amount"
          value={donationAmount !== null ? donationAmount : ''}
          onChange={handleCustomAmountChange}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn">Checkout</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DonationForm;