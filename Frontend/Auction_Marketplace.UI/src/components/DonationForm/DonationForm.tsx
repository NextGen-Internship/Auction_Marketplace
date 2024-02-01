import React, { useState } from 'react';
import './DonationForm.css'

interface DonationFormProps {
  onClose: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onClose }) => {
  const [donationAmount, setDonationAmount] = useState<number | null>(null);

  const handleAmountButtonClick = (amount: number) => {
    setDonationAmount(amount);
  };

  const handleCustomAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const customAmount = parseFloat(event.target.value);
    setDonationAmount(isNaN(customAmount) ? null : customAmount);
  };

  const handleSubmit = () => {
    // Handle the submission logic here, e.g., sending the donation amount to the server
    console.log('Donation Amount:', donationAmount);
    onClose(); // Close the form after submission
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
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DonationForm;
