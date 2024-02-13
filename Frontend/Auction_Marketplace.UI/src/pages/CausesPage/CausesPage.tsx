import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CausesPage.css';
import AddStripeForm from '../../components/AddStripeForm/AddStripeForm.tsx';
import UserService from '../../Services/UserService.ts';
import ApiService from '../../Services/ApiService';
import StripeService from '../../Services/StripeService';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import CauseDTO from '../../Interfaces/DTOs/CauseDTO';
import CreateCauseDTO from '../../Interfaces/DTOs/CauseDTO';
import UpdateCauseDTO from '../../Interfaces/DTOs/UpdateCauseDTP.ts';
import Navbar from '../../components/Navbar/Navbar.tsx';
import { clearToken, getToken, isTokenExpired } from '../../utils/GoogleToken.ts';
import UserDTO from '../../Interfaces/DTOs/UserDTO.ts';
import CauseService from '../../Services/CauseService.ts';
import UpdateCauseForm from '../../components/CausesForm/UpdateCauseForm.tsx';
import AddCauseForm from '../../components/CausesForm/AddCauseForm.tsx';

const CausesPage: React.FC = () => {
  const token = getToken();
  const [showAddCauseForm, setShowAddCauseForm] = useState(false);
  const [showAddStrypeForm, setShowAddStrypeForm] = useState(false);
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
    const saveTokenOnUnload = () => {
      const token = getToken();
      if (token) {
        localStorage.setItem('token', token);
      }
    };
    window.addEventListener('beforeunload', saveTokenOnUnload);
    return () => {
      window.removeEventListener('beforeunload', saveTokenOnUnload);
    };
  }, []);

  useEffect(() => {
    const persistedToken = localStorage.getItem('token');
    if (persistedToken) {
      sessionStorage.setItem('token', persistedToken);
      navigate('/causes');
    }
  }, []);

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
            alert('Succesfully deleted cause');
            navigate('/causes');
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

  const handleAddCauseClick = async () => {
    try {
      const apiService = new ApiService();
      const stripeService = new StripeService(apiService);
      const {hasStripeAccount} = await stripeService.StripeUserExists();
      if (hasStripeAccount) {
        setShowAddCauseForm(true);
      } else {
        setShowAddStrypeForm(true);
      }
      setHideCausesContainer(true);
    } catch (error) {
      console.error('Error checking condition:', error);
    }
  };

  const handleCloseForm = () => {
    setShowAddCauseForm(false);
    setShowAddStrypeForm(false);
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
  const totalPages = Math.ceil(causes.length / causesPerPage);

  const maxPageButtons = 3;

  if (totalPages <= maxPageButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage;
    let endPage;

    if (currentPage <= Math.ceil(maxPageButtons / 2)) {
      startPage = 1;
      endPage = maxPageButtons;
    } else if (currentPage + Math.floor(maxPageButtons / 2) >= totalPages) {
      startPage = totalPages - maxPageButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPageButtons / 2);
      endPage = currentPage + Math.floor(maxPageButtons / 2);
    }

    if (startPage > 1) {
      pageNumbers.push(1, '...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push('...', totalPages);
    }
  }

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => {
            if (typeof pageNumber === 'number') {
              setCurrentPage(pageNumber);
            }
          }}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

  return (
    <div>
      <Navbar showAuthButtons={false} />
      <div className="search-bar-container">
  <input
    type="text"
    placeholder="Search..."
    className="search-bar-input"
    // Add onChange event handler to handle search functionality
    //onChange={(e) => handleSearch(e.target.value)}
  />
  <button className="search-bar-button">Search</button>
</div>

      <button className="add-cause-button" onClick={handleAddCauseClick}>
        Add Your Cause
      </button>
   

      {showAddCauseForm && <AddCauseForm onClose={handleCloseForm} />}
      {showAddStrypeForm && <AddStripeForm onClose={handleCloseForm} />}
      {!hideCausesContainer && (
        <div className="cause-info-container">
          {currentCauses.map((cause) => (
            <div key={cause.causeId} className="cause-info">
              <h3 className='header'>{cause.name}</h3>
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