import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { getToken } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './CausesPage.css'
import AddCauseForm from '/Users/Teoslava.Yordanova/Documents/Auction_Marketplace/Frontend/Auction_Marketplace.UI/src/components/AddCauseForm/AddCauseForm.tsx';
import React, { useState } from 'react';

const CausesPage: React.FC = () => {
const token = getToken();
  const [showAddCauseForm, setShowAddCauseForm] = useState(false);

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

  
  const handleAddCauseClick = () => {
    setShowAddCauseForm(true);
  };

  const handleCloseForm = () => {
    setShowAddCauseForm(false);
  };


  return (
    <div>
      <Navbar showAuthButtons={false} />
      <button className="add-cause-button" onClick={handleAddCauseClick}>
        Add Your Cause
      </button>

      {showAddCauseForm && <AddCauseForm onClose={handleCloseForm} />}
    </div>
  );
};

export default CausesPage;
