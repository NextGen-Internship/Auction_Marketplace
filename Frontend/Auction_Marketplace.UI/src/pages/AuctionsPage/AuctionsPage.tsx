import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired } from '../../utils/AuthUtil';
import '../../Components/TokenExp/TokenExpContainer.css';
import Navbar from '../../Components/Navbar/Navbar';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import AuctionService from '../../Services/AuctionService';
import ApiService from '../../Services/ApiService';
import './AuctionsPage.css'
import CreateAuctionDTO from '../../Interfaces/DTOs/AuctionDTO';
import AuctionDTO from '../../Interfaces/DTOs/AuctionDTO';
import AddAuctionForm from '../../Components/AddAuctionForm/AddAuctionForm';

const AuctionsPage: React.FC = () => {
    const token = getToken();
    const [showNewAuctionForm, setShowNewAuctionForm] = useState(false);
    const [auctions, setAuctions] = useState<CreateAuctionDTO[]>([]);
    const [hideAuctionContainer, setHideAuctionContainer] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const auctionsPerPage = 10;

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const apiService = new ApiService;
                const auctionService = new AuctionService(apiService);
                const response: ApiResponseDTO = await auctionService.fetchAuctions();

                const auctions: AuctionDTO[] = response.data || [];
                setAuctions(auctions);
            } catch (error) {
                console.error('Error fetching auctions:', error);
            }
        };
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
            <label className='label-buttons'>
                <button className="add-auction-button" onClick={handleAddAuctionClick}>
                    Add Auction
                </button>

            </label>
            {showNewAuctionForm && <AddAuctionForm onClose={handleCloseForm} />}

            {!hideAuctionContainer && (
                <div className="auction-info-container">
                    {currentAuction.map((auction) => (
                        <div key={auction.auctionId} className="auction-info">
                            <h3>{auction.name}</h3>
                            <Link to={`/details/${auction.auctionId}`} className="details-button-auctions">
                                Details
                            </Link>
                        </div>
                    ))}
                    {renderMiniPages()}
                </div>
            )}
            <Navbar showAuthButtons={false} />
        </div>
    );
};

export default AuctionsPage;
