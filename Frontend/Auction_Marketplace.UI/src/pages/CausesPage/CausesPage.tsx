import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './CausesPage.css';
import AddCauseForm from '../../Components/AddCauseForm/AddCauseForm.tsx';
import React, { useState, useEffect } from 'react';
import CauseService from '../../Services/CauseService'; 
import ApiService from '../../Services/ApiService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import CauseDTO from '../../Interfaces/DTOs/CauseDTO';
import CreateCauseDTO from '../../Interfaces/DTOs/CauseDTO';

const CausesPage: React.FC = () => {
  const token = getToken();
  const [showAddCauseForm, setShowAddCauseForm] = useState(false);
  const [causes, setCauses] = useState<CreateCauseDTO[]>([]);
  const [hideCausesContainer, setHideCausesContainer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const causesPerPage = 10;

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

    if (isTokenExpired()) {
        clearToken();
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
    setHideCausesContainer(true);
  };

  const handleCloseForm = () => {
    setShowAddCauseForm(false);
    setHideCausesContainer(false);
  };

  const indexOfLastCause = currentPage * causesPerPage;
  const indexOfFirstCause = indexOfLastCause - causesPerPage;
  const currentCauses = causes.slice(indexOfFirstCause, indexOfLastCause);

  const renderMiniPages = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(causes.length / causesPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={number === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar showAuthButtons={false} />
      <button className="add-cause-button" onClick={handleAddCauseClick}>
        Add Your Cause
      </button>

      {showAddCauseForm && <AddCauseForm onClose={handleCloseForm} />}

      {!hideCausesContainer && (
        <div className="cause-info-container">
          {currentCauses.map((cause) => (
            <div key={cause.causeId} className="cause-info">
              <h3>{cause.name}</h3>
              <img src={cause.photo} alt={cause.name} />
              <Link to={`/details/${cause.causeId}`} className="details-button">
                Details
              </Link>
            </div>
          ))}
          {renderMiniPages()}
        </div>
      )}
    </div>
  );
};

export default CausesPage;
