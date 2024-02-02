import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil';
import '../../Components/TokenExp/TokenExpContainer.css';
import Navbar from '../../Components/Navbar/Navbar';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import AuctionService from '../../Services/AuctionService';
import ApiService from '../../Services/ApiService';
import '../CausesPage/CausesPage.css';
import AuctionDTO from '../../Interfaces/DTOs/AuctionDTO';
import AddAuctionForm from '../../Components/AddAuctionForm/AddAuctionForm';
import UpdateAuctionForm from '../../Components/UpdateAuctionForm/UpdateAuctionForm';
import UserService from '../../Services/UserService';
import UserDTO from '../../Interfaces/DTOs/UserDTO';

const apiService = new ApiService;
const auctionService = new AuctionService(apiService);
const userService = new UserService(apiService);

interface AuctionsPageProps {
    user: UserDTO;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuctionsPage: React.FC = ({ }) => {
    const token = getToken();
    const [showNewAuctionForm, setShowNewAuctionForm] = useState(false);
    const [showUpdateAuctionForm, setShowUpdateAuctionForm] = useState(false);
    const [auctions, setAuctions] = useState<AuctionDTO[]>([]);
    const [hideAuctionContainer, setHideAuctionContainer] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const auctionsPerPage = 3;
    const [user, setUser] = useState<UserDTO>({
        firstName: '',
        lastName: '',
        email: '',
        userId: 0
    });
    const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(null);


    const userResponse = async () => {
        const response: ApiResponseDTO = await userService.fetchUser();
        const userData = response.data;
        setUser(userData);
    }

    const fetchAuctions = async () => {
        try {
            const response: ApiResponseDTO = await auctionService.fetchAuctions();
            const fetchAuctions: AuctionDTO[] = response.data || [];
            setAuctions(fetchAuctions);

        } catch (error) {
            console.error('Error fetching auctions:', error);
        }
    };

    const handleUpdateAuctionClick = (auctionId: number) => {
        setShowUpdateAuctionForm(true);
        setHideAuctionContainer(true);
      //  setSelectedAuctionId(auctionId)
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateAuctionForm(false);
        setHideAuctionContainer(false);
        setSelectedAuctionId(null);
    };

    useEffect(() => {
        if (token) {
            fetchAuctions();
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

    const handleAddAuctionClick = () => {
        setShowNewAuctionForm(true);
        setHideAuctionContainer(true);
    };

    const handleCloseForm = () => {
        setShowNewAuctionForm(false);
        setHideAuctionContainer(false);
    };

    const indexOfLastAuction = currentPage * auctionsPerPage;
    const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
    const currentAuction = auctions.slice(indexOfFirstAuction, indexOfLastAuction);

    const renderMiniPages = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(auctions.length / auctionsPerPage); i++) {
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
            <div className="add-cause-container">
                <button className="add-cause-button" onClick={handleAddAuctionClick}>
                    Add Auction
                </button>
            </div>
            {showNewAuctionForm && <AddAuctionForm onClose={handleCloseForm} />}
            
            {!hideAuctionContainer && (
                <div className="cause-info-container">
                    {currentAuction.map((auction) => (
                        <div key={auction.auctionId} className="cause-info">
                            <h3>{auction.name}</h3>
                            <img src={auction.photo} alt={auction.name} />
                            <Link to={`auction/details/${auction.auctionId}`} className="details-button">
                                Details
                            </Link>
                            {showUpdateAuctionForm && <UpdateAuctionForm onClose={handleCloseUpdateForm} />}
                            <Link to={`/update/auction/${auction.auctionId}`} className="update-cause-button">
                                Update {auction.name}
                            </Link>
                        </div>
                    ))}
                    {renderMiniPages()}
                </div>
            )}
        </div>
    );
};

export default AuctionsPage;