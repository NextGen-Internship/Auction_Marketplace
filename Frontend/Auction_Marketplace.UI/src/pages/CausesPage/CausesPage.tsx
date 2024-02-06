import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar.tsx';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil.ts';
import '../../Components/TokenExp/TokenExpContainer.css';
import './CausesPage.css';
import AddCauseForm from '../../Components/CausesForm/AddCauseForm.tsx';
import React, { useState, useEffect } from 'react';
import CauseService from '../../Services/CauseService';
import ApiService from '../../Services/ApiService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import CauseDTO from '../../Interfaces/DTOs/CauseDTO';
import CreateCauseDTO from '../../Interfaces/DTOs/CauseDTO';
import UserDTO from '../../Interfaces/DTOs/UserDTO.ts';
import UpdateCauseForm from '../../Components/CausesForm/UpdateCauseForm.tsx';
import UpdateCauseDTO from '../../Interfaces/DTOs/UpdateCauseDTP.ts';
import UserService from '../../Services/UserService.ts';

const CausesPage: React.FC = () => {
  const token = getToken();
  const [showAddCauseForm, setShowAddCauseForm] = useState(false);
  const [causes, setCauses] = useState<CreateCauseDTO[]>([]);
  const [hideCausesContainer, setHideCausesContainer] = useState(false);
  const [selectedCauseId, setSelectedCauseId] = useState<number | null>(null);
  const [showUpdateCauseForm, setShowUpdateCauseForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const causesPerPage = 3;
  const [initialCauseFormData, setInitialCauseFormData] = useState<UpdateCauseDTO | null>(null);
  const [user, setUser] = useState<UserDTO>({
    firstName: '',
    lastName: '',
    email: '',
    userId: 0,
    profilePicture: undefined
  });
  const navigate = useNavigate();
  const apiService = new ApiService();
  const causeService = new CauseService(apiService);
  const userService = new UserService(apiService);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
      fetchData();
    }
    if (isTokenExpired()) {
      clearToken();
    }

  }, [token]);

  const fetchUserProfile = async () => {
    try {
      if (token) {
        const response: ApiResponseDTO = await userService.fetchUser();
        const userData = response.data;
        if (response.succeed) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('Error during user profile fetch:', error);
    }
  };


  const fetchData = async () => {
    try {
      const causesResponse: ApiResponseDTO = await causeService.getAllCauses();
      console.log('Causes Response:', causesResponse);

      const causes: CauseDTO[] = causesResponse.data || [];
      setCauses(causes);
    } catch (error) {
      console.error('Error fetching causes:', error);
    }
  };

  const handleCheckUserIdForAuction = (cause: CauseDTO, userId: number): boolean => {
    return userId === cause.userId;
  };

  const handleUpdateCauseClick = async (causeId: number) => {
    try {
      const response: ApiResponseDTO = await causeService.getCauseById(causeId);
      const causeData = response.data;

      const cause = causes.find((cause) => cause.causeId === causeId);
      if (cause && user.userId === cause.userId) {
        setSelectedCauseId(causeId);
        setInitialCauseFormData(causeData);

        navigate(`/cause/${causeId}`);
      } else {
        console.warn('You are not the creator of this cause.');
      }
    } catch (error) {
      console.error('Error fetching cause details:', error);
    }
  };

  const handleDeleteCause = async (causeId: number) => {
    try {
        const response: ApiResponseDTO = await causeService.deleteCause(causeId);

        if (response.succeed) {
            alert('Succesfully deleted cause')
            navigate('/auctions');
        } else {
            console.warn('You are not the creator of this cause.');
        }
    } catch (error) {
        console.error('Error deleting cause details:', error);
    }
};


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

  const handleCloseUpdateForm = () => {
    setShowUpdateCauseForm(false);
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
              <Link to={`/causes/details/${cause.causeId}`} className="details-button">
                Details
              </Link>

              {handleCheckUserIdForAuction(cause, user.userId) && (
                <React.Fragment key={cause.causeId}>
                  <button className='update-button' onClick={() =>
                    handleUpdateCauseClick(cause.causeId)} >
                    Update
                  </button>
                  {showUpdateCauseForm && (
                    <UpdateCauseForm
                      onClose={handleCloseUpdateForm}
                      causeId={selectedCauseId || 0}
                      initialCauseData={initialCauseFormData}
                    />
                  )}
                </React.Fragment>
              )}

              {handleCheckUserIdForAuction(cause, user.userId) && (
                <React.Fragment key={cause.causeId}>
                  <button className='delete-button' onClick={() =>
                    handleDeleteCause(cause.causeId)} >
                    Delete
                  </button>
                </React.Fragment>
              )}
            </div>
          ))}
          {renderMiniPages()}
        </div>
      )}
    </div>
  );
};

export default CausesPage;
