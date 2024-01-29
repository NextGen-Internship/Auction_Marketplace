import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { getToken } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './CausesPage.css';
import AddCauseForm from '/Users/Teoslava.Yordanova/Documents/Auction_Marketplace/Frontend/Auction_Marketplace.UI/src/components/AddCauseForm/AddCauseForm.tsx';
import React, { useState, useEffect } from 'react';
import CauseService from '../../Services/CauseService'; 
import ApiService from '../../Services/ApiService';
import './CausesPage.css';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';

interface Cause {
  id: number;
  name: string;
  photo: string;
}

interface CauseCreated {
  causeId: number;
  userId: number;
  user: any; // Replace 'any' with the actual type of 'user'
  name: string;
  description: string;
  photo: string;
  amountNeeded: number;
  amountCurrent: number;
  isCompleted: boolean;
  donations: any[]; // Replace 'any' with the actual type of 'donations'
  createdAt: string;
  updatedAt: string;
  deletedOn: string | null;
}

const CausesPage: React.FC = () => {
  const token = getToken();
  const [showAddCauseForm, setShowAddCauseForm] = useState(false);
  const [causes, setCauses] = useState<CauseCreated[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiService = new ApiService();
        const causeService = new CauseService(apiService);
        const causesResponse: ApiResponseDTO<CauseCreated[]> = await causeService.getAllCauses();
        const causes: CauseCreated[] = causesResponse.data || [];
        setCauses(causes);
      } catch (error) {
        console.error('Error fetching causes:', error);
      }
    };

    if (token) {
      fetchData();
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

      <div className="cause-info-container">
        {causes.map((cause) => (
          <div key={cause.causeId} className="cause-info">
            <h3>{cause.name}</h3>
            <img src={cause.photo} alt={cause.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CausesPage;
