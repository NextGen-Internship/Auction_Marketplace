import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/AuthUtil';
import '../../Components/TokenExp/TokenExpContainer.css';
import Navbar from '../../Components/Navbar/Navbar';
import ApiResponseDTO from '../../Interfaces/DTOs/ApiResponseDTO';
import AuctionService from '../../Services/AuctionService';
import ApiService from '../../Services/ApiService';
import './AuctionsPage.css';

const apiService = new ApiService;
const auctionService = new AuctionService(apiService);

const AuctionsPage: React.FC = () => {
    const token = getToken();

    const [showNewAuctionForm, setShowNewAuctionForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState('');

    const [auction, setAuction] = useState({
        name: '',
        description: '',
        isCompleted: false,
    });

    const handleNewAuctionClick = () => {
        setShowNewAuctionForm(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAuction((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setAuction((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleNewAuctionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setAuction({
            name: '',
            description: '',
            isCompleted: false,
        });
        setShowNewAuctionForm(false);
        fetchAuctions();
    };

    const fetchAuctions = async () => {
        try {
            const response: ApiResponseDTO = await auctionService.fetchAuctions();
            const auctionData = await response.data;
            if (response.succeed) {
                setAuction(auctionData);
                console.log(auctionData);
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
                    <button className="create-new-auction-btn" onClick={handleNewAuctionClick}>
                        New Auction
                    </button>
                    {showNewAuctionForm && (
                        <form className="create-new-auction-form" onSubmit={handleNewAuctionSubmit}>
                            <label className="inputs">
                                Name:
                                <input className="input-label" type="text" name="name" value={auction.name} onChange={handleInputChange} />
                            </label>
                            <br />
                            <label className="inputs">
                                Description:
                                <textarea name="description" value={auction.description} onChange={handleInputChange} />
                            </label>
                            <br />
                            <label className="inputs">
                                Is Completed:
                                <input className="input-label"
                                    type="checkbox"
                                    name="isCompleted"
                                    checked={auction.isCompleted}
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                            <br />
                            <button className="create-new-auction-btn" type="submit">Create Auction</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuctionsPage;
