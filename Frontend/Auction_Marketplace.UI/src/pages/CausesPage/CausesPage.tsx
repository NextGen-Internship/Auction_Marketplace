import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { getToken } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './CausesPage.css';
import AddCauseForm from '../../components/AddCauseForm/AddCauseForm.tsx';
import React, { useState, useEffect } from 'react';
import CauseService from '../../Services/CauseService'; 
import ApiService from '../../Services/ApiService';
import './CausesPage.css';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import CauseDTO from '../../Interfaces/DTOs/CauseDTO';
import CreateCauseDTO from '../../Interfaces/DTOs/CauseDTO';



const CausesPage: React.FC = () => {
  const token = getToken();
  const [showAddCauseForm, setShowAddCauseForm] = useState(false);
  const [causes, setCauses] = useState<CreateCauseDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiService = new ApiService();
        const causeService = new CauseService(apiService);
        const causesResponse: ApiResponseDTO = await causeService.getAllCauses();
         console.log('Causes Response:', causesResponse);

        const causes: CauseDTO[] = causesResponse.data || [];
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
