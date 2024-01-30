import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/AuthUtil';
import '../../Components/TokenExp/TokenExpContainer.css';
import Navbar from '../../Components/Navbar/Navbar';
import "../MarketplacePage/MarketplacePage.css";
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import AuctionService from '../../Services/AuctionService';
import ApiService from '../../Services/ApiService';

const apiService = new ApiService;
const auctionService = new AuctionService(apiService);

const Marketplace: React.FC = () => {
    const token = getToken();
    const [showNewAuctionForm, setShowNewAuctionForm] = useState(false);
    const [newAuctionData, setNewAuctionData] = useState({
        name: '',
        description: '',
        isCompleted: false,
    });

    const [auctions, setAuctions] = useState([]);

    const handleNewAuctionClick = () => {
        setShowNewAuctionForm(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewAuctionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewAuctionData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleNewAuctionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call your backend API to create a new auction using newAuctionData
        // Example: await createAuction(newAuctionData);

        // Reset the form after submission
        setNewAuctionData({
            name: '',
            description: '',
            isCompleted: false,
        });

        // Hide the form after submission
        setShowNewAuctionForm(false);
    };

    const fetchAuctions = async () => {
        try {
            if (token) {
                const response : ApiResponseDTO = await auctionService.fetchAuctions();
                const data = await response.data;
                if(response.succeed) {
                    setAuctions(data);
                }
            }
        } catch (error) {
            console.error('Error fetching auctions:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAuctions();
        }
    }, [token]
    );

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

    return (
        <div>
            <Navbar showAuthButtons={false} />
            <div>
                <div className="auctions-container">
                    <button onClick={handleNewAuctionClick}>New Auction</button>
                    {showNewAuctionForm && (
                        <form onSubmit={handleNewAuctionSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" value={newAuctionData.name} onChange={handleInputChange} />
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea name="description" value={newAuctionData.description} onChange={handleInputChange} />
                            </label>
                            <br />
                            <label>
                                Is Completed:
                                <input
                                    type="checkbox"
                                    name="isCompleted"
                                    checked={newAuctionData.isCompleted}
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                            <br />
                            <button type="submit">Create Auction</button>
                        </form>
                    )}
                    <label>
                        Description:
                    </label>
                    <label>
                        Description:
                    </label>
                    <label>
                        Description:
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
